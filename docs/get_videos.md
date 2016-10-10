# GET /videos

Returns a collection of the most recently created videos in the Get Native database.

## Example Request

```
https://get-native.com/videos.json?count=80&trim_likes=true&lang=en
https://get-native.com/videos.json?count=10&lang=en&max_id=2244994983
```

| Parameter       	| Description                                                                                                                      	| Required 	| Default 	|
|-----------------	|----------------------------------------------------------------------------------------------------------------------------------	|:--------:	|---------	|
| count           	| The number of videos to include in the response.                                                                                 	|          	|         	|
| trim_speaker    	| When true, only the speaker name will be returned -- as opposed to the whole speaker object.                                     	|          	| false   	|
| trim_likes      	| When true, only the likes count is returned -- as opposed to an array of like objects.                                           	|          	| false   	|
| exclude_speaker 	| When true, the speaker is not included in the response.                                                                          	|          	| false   	|
| exclude_likes   	| When true, the likes array is not included in the response.                                                                      	|          	| false   	|
| lang            	| Restricts videos to the given language, specified by an [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) code. 	|          	|         	|
| max_id          	| Returns only videos with an ID less than or equal to the max_id.                                                                 	|          	|         	|

※ The `since_id` parameter is not usable. It is reserved for future use.

### About max_id

Instead of listing videos in "pages," Get Native returns videos according to the `count` and `max_id` parameters. 
When you've retrieved an initial array of videos using the `/videos` URI, make note of the _lowest_ video ID. 
When you're ready to _Load More_ videos, specify the lowest video ID in the `max_id` field to retrieve another batch of 
videos whose IDs are _lower than or equal to_ the specified `max_id`. The lower the video ID, the older the video.

## Example Response

| Data Field | Type    | Description                                   |
|------------|---------|-----------------------------------------------|
| count      | Int     | The number of videos included in the response |
| records    | [Video] | The array of video objects                    |

```json
{
	"data": {
		"count": 80,
		"records": [
			{
				"favorited": true,
					"created_at": "Sat Dec 14 04:35:55 +0000 2015",
					"id_str": "2244994983",
					"id": 2244994983,
					"speaker": {
						"id": 123456,
						"id_str": "123456",
						"description": "Harold Ford is a man from Kansas City, MO. He loves the Chiefs and listens to samba.",
						"name": "Harold Ford",
						"created_at": "Sat Dec 14 04:35:55 +0000 2015",
						"lang": "en",
						"gender": "male",
						"location": "Kansas City, MO"
					},
					"lang": "en",
					"favorite_count": 342,
					"topic": {
						"id": 123456,
						"id_str": "123456",
						"created_at": "Sat Dec 14 04:35:55 +0000 2015",
						"name": "Talking to customers"
					},
					"loop_count": 7156,
					"loop_velocity": 2.4960000000000004,
					"thumbnail_image_url": "TODO",
					"video_url": "TODO",
					"has_related_videos": true,
					"likes": [
						"records": [
							{
								"created_at": "Sat Dec 14 04:35:55 +0000 2015",
								"user": {
									"screen_name": "Phil Barnes",
									"id": 123,
									"id_str": "123",
									// TODO: Unsafe
								},
								"id": 456,
								"id_str": "456"
							}
						],
						"count": 10
					],
					"length": 68
			}
		]
	},
	"success": true,
	"error": ""
}
```