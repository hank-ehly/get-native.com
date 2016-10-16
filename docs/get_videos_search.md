# GET /videos/search

Returns an array of video objects matching the specified search query.

# Example Request

```
GET
https://get-native.com/videos/search?q=Business%20Ethics&lang=en
```

| Parameter       | Description                                                                                                                      | Required | Default |
|-----------------|----------------------------------------------------------------------------------------------------------------------------------|----------|---------|
| lang            | Restricts videos to the given language, specified by an [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) code. |          |         |
| count           | The number of videos to include in the response. Maximum is 100.                                                                 |          | 15      |
| trim_speaker    | When true, only the speaker name will be returned -- as opposed to the whole speaker object.                                     |          | false   |
| trim_likes      | When true, only the likes count is returned -- as opposed to an array of like objects.                                           |          | false   |
| exclude_speaker | When true, the speaker is not included in the response.                                                                          |          | false   |
| exclude_likes   | When true, the likes array is not included in the response.                                                                      |          | false   |
| max_id          | Returns only videos with an ID less than or equal to the max_id.                                                                 |          |         |
| topic_id        | Restricts videos to the given topic.                                                                                             |          |         |
| category_id     | Restricts videos to the given category. If the topic_id parameter is also included, the category_id parameter is ignored.        |          |         |
| q               | A URL-encoded UTF-8 search query. Maximum length is 100 characters.                                                              |          |         |

# Example Response

| Data Field | Type    | Description                                              |
|------------|---------|----------------------------------------------------------|
| count      | Int     | The number of videos included in the response.           |
| records    | [Video] | The array of video objects relevant to the search query. |

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
