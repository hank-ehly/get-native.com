# GET /videos/show/:id

Returns the video specified by the `id` query parameter.

## Example Request

```
https://get-native.com/videos/show.json?id=123456
```

| Parameter | Required | Default Value |
|-----------|----------|---------------|
| id        | √         |               |

## Example Result

| Field               | Type        | Description                                                                                        |
|---------------------|-------------|----------------------------------------------------------------------------------------------------|
| favorited           | Boolean     | _Nullable._ Whether the video has been favorited by the user                                       |
| created_at          | String      | UTC datetime of video creation                                                                     |
| id_str              | String      | String representation of unique video ID                                                           |
| id                  | Int64       | Integer representation of unique video ID                                                          |
| speaker             | Speaker     | The speaker of the video                                                                           |
| lang                | String      | _Nullable._ The BCP 47 identifier of the video language                                            |
| favorite_count      | Integer     | _Nullable._ The approximate number of times the video has been favorited by other Get Native users |
| topic               | Topic       | The topic to which the video belongs                                                               |
| loop_count          | Int         | The number of times a video has reached the end of its length                                      |
| loop_velocity       | Float       | _Nullable._ The velocity at which the loop count should automatically increase                     |
| thumbnail_image_url | String      | The HTTPS URL for the video thumbnail image                                                        |
| video_url           | String      | The HTTPS URL for the actual video data                                                            |
| has_related_videos  | Boolean     | ??                                                                                                 |
| likes               | [Like]      | An array containing the Likes associated with the video                                            |
| liked               | Boolean     | Whether the video has been liked by the user                                                       |
| length              | Int         | The length of the video in seconds                                                                 |

```json
{
	data: {
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
			// TODO
		},
		"loop_count": 7156,
		"loop_velocity": 2.4960000000000004,
		"thumbnail_image_url": "TODO",
		"video_url": "TODO",
		"has_related_videos": true,
		"likes": [
			records: [
				{
					"created_at": "Sat Dec 14 04:35:55 +0000 2015",
					"user": {
						"screen_name": "Phil Barnes",
						"id": 123,
						"id_str": "123",
						// TODO
					},
					"id": 456,
					"id_str": "456"
				}
			],
			count: 10
		],
		"length": 68
	},
	success: true,
	error: ""
}
```
