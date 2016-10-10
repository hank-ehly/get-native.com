# GET /videos

Returns a collection of the most recently created videos in the Get Native database.

## Example Request

```
https://get-native.com/videos.json?count=80&trim_likes=true
```

| Parameter    | Required | Default Value |
|--------------|----------|---------------|
| count        |          |               |
| trim_speaker |          | false         |
| trim_likes   |          | false         |

## Example Response

| Field | Type | Description                                   |
|-------|------|-----------------------------------------------|
| count | Int  | The number of videos included in the response |

```json
{
	"data": {
		"count": 80,
		[
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
			}
		]
	}
}
```