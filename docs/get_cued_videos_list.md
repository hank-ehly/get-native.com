# GET /cued_videos/list

Returns the 20 most recent **cued videos** added by the user to their dashboard.

## Example Request

```
GET
https://get-native.com/cued_videos/list.json
```

| Parameter 	| Description                                                      	| Required 	| Default 	|
|-----------	|------------------------------------------------------------------	|:--------:	|---------	|
| max_id    	| Returns only videos with an ID less than or equal to the max_id. 	|          	|         	|
| count     	| The number of video records to retrieve. Maximum is 200.         	|          	| 20      	|

## Example Response

| Data Field 	| Type        	| Description                                               	|
|------------	|-------------	|-----------------------------------------------------------	|
| records    	| [CuedVideo] 	| The array of CuedVideo records.                           	|
| count      	| Int         	| The number of CuedVideo records included in the response. 	|

```json
{
	"data": {
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
