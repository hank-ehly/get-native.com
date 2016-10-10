# GET /videos/show/:id

Returns the video specified by the `id` query parameter.

## Example Request

```
https://get-native.com/videos/show.json?id=123456
```

| Parameter   	| Description                         	| Required 	| Default 	|
|-------------	|-------------------------------------	|:--------:	|---------	|
| id          	| The unique ID of the video.          	|     √    	|         	|

## Example Result

| Data Field          | Type         | Description                                                                                        |
|---------------------|--------------|----------------------------------------------------------------------------------------------------|
| favorited           | Boolean      | _Nullable._ Whether the video has been favorited by the user                                       |
| created_at          | String       | UTC datetime of video creation                                                                     |
| id_str              | String       | String representation of unique video ID                                                           |
| id                  | Int64        | Integer representation of unique video ID                                                          |
| speaker             | Speaker      | The speaker of the video                                                                           |
| lang                | String       | _Nullable._ The BCP 47 identifier of the video language                                            |
| favorite_count      | Integer      | _Nullable._ The approximate number of times the video has been favorited by other Get Native users |
| topic               | Topic        | The topic to which the video belongs                                                               |
| loop_count          | Int          | The number of times a video has reached the end of its length                                      |
| loop_velocity       | Float        | _Nullable._ The velocity at which the loop count should automatically increase                     |
| thumbnail_image_url | String       | The HTTPS URL for the video thumbnail image                                                        |
| video_url           | String       | The HTTPS URL for the actual video data                                                            |
| has_related_videos  | Boolean      | TODO                                                                                               |
| likes               | [Like]       | An array containing the Likes associated with the video                                            |
| liked               | Boolean      | Whether the video has been liked by the user                                                       |
| length              | Int          | The length of the video in seconds                                                                 |
| category            | Category     | A representation of the category to which the video belongs.                                       |
| transcripts         | [Transcript] | An array of transcript objects corresponding to the video.                                         |
| questions           | [Question]   | An array of question objects used for the writing section of a video.                              |

```json
{
	"data": {
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
						// TODO: Unsafe
					},
					"id": 456,
					"id_str": "456"
				}
			],
			"count": 10
		],
		"length": 68,
		"category": {
			"name": "Business",
			"id": 123456,
			"id_str": "123456",
			"created_at": "Sat Dec 14 04:35:55 +0000 2015"
		},
		"transcripts": {
			"count": 2
			"records": [
				{
					"id": 123,
					"id_str": "123",
					"text": "This is the English transcript. This is the text that will be displayed on the video detail page.",
					"lang": "en",
					"collocations": {
						"count": 3,
						"records": [
							{
								"text": "This is the text",
								"description": "This is the description",
								"usage_examples": {
									"count": 3,
									"records": [
										{"text": "This is the text in which will appear.."},
										{"text": "I will tell you that this is the text."},
										{"text": "I don't really know if this is the text."}
									]
								}
							}
						]
					}
				}
			]
		},
		"questions": {
			"count": 4,
			"records": [
				{
					"text": "What do you think of this text?",
					"example_answer": "I think this text is really great. I really do. I think if this text were a person, I would marry it."
				}
			]
		}
	},
	"success": true,
	"error": ""
}
```
