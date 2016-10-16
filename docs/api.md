# Introduction

All API responses contain the following root level parameters:

| Parameter 	| Type    	| Meaning                                                                                                                        	|
|-----------	|---------	|--------------------------------------------------------------------------------------------------------------------------------	|
| data      	| Object  	| The requested response data.                                                                                                   	|
| success   	| Boolean 	| When true, this indicates that the request was completed as expected.                                                          	|
| error     	| String  	| _Nullable._ If "success" is false, error is populated with a UTF-8 error message string describing why the transaction failed. 	|

In the case that a response contains 1 or more arrays, each array will contain a "count" parameter at their same level,
indicating the number of records included in the array.

```json
{
	"data": {
		"count": 45,
		"records": [
			{"id": 123},
			{"id": 456}
		]
	},
	"success": true,
	"error": ""
}
```

# DELETE /account

Deactivate the account of the authenticating user.

TODO: Define specific account deletion technique.

**Example Request**

```
DELETE
https://get-native/account
```

**Example Response**

```json
{
	"data": {},
	"success": true,
	"error": ""
}
```
# DELETE /account/authenticate

Delete the authenticating users' current login session.

**Example Request**

```
DELETE 
https://get-native.com/users/authenticate
```

**Example Response**

```json
{
	"data": {},
	"success": true,
	"error": ""
}
```
# DELETE /account/notifications/:id

Delete a notification for the authenticating user.

**Example Request**

```
DELETE
https://get-native.com/account/notifications/158
```

**Example Response**

```json
{
	"data": {},
	"success": true,
	"error": ""
}
```
# GET /account/verify_credentials

Returns a user object corresponding to the authenticating user if authentication is successful.

**Example Request**

```
GET
https://get-native.com/account/verify_credentials.json
```

**Example Response**

| Data Field            | Type           | Description                                                        |
|-----------------------|----------------|--------------------------------------------------------------------|
| id                    | Int64          |  Integer representation of unique user ID                          |
| id_str                | String         |  String representation of unique user ID                           |
| name                  | String         |  The user's self-declared real name                                |
| screen_name           | String         |  The user's self-declared screen name                              |
| created_at            | String         |  UTC datetime of account creation                                  |
| utc_offset            | Int            |  _Nullable._ Offset in seconds from UTC                            |
| time_zone             | String         |  _Nullable._ User declared Time Zone                               |
| lang                  | String         |  BCP 47 code for user declared language                            |
| profile_image_url     | String         |  HTTPS URI for user profile image                                  |
| default_profile_image | Boolean        | If true, the user has not uploaded their own image                 |
| email                 | String         | The user's email                                                   |
| favorites_count       | String         | Aggregate total number of videos favorited by user                 |
| notifications         | [Notification] | _Nullable._ An array of notifications for the authenticating user. |

```json
{
	"data": {
		"id": 2244994983,
		"id_str": "2244994983",
		"name": "John Doe",
		"screen_name": "john_doe",
		"created_at": "Sat Dec 14 04:35:55 +0000 2015",
		"utc_offset": 180000,
		"time_zone": "Pacific Time (US & Canada)",
		"lang": "en",
		"profile_image_url": "TODO",
		"default_profile_image": false,
		"email": "john_doe@example.com",
		"favorites_count": 45,
		"notifications": {
			"records": [
				{
					"id": 123456,
					"id_str": "123456",
					"text": "This is the body text of a notification",
					"title": "Welcome to Get Native"
				}
			],
			"count": 10
		}
	},
	"success": true,
	"error": ""
}
```
# GET /cued_videos/list

Returns the 20 most recent **cued videos** added by the user to their dashboard.

**Example Request**

```
GET
https://get-native.com/cued_videos/list.json
```

| Parameter 	| Description                                                      	| Required 	| Default 	|
|-----------	|------------------------------------------------------------------	|:--------:	|---------	|
| max_id    	| Returns only videos with an ID less than or equal to the max_id. 	|          	|         	|
| count     	| The number of video records to retrieve. Maximum is 200.         	|          	| 20      	|

**Example Response**

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
# GET /speakers/show

Returns information about the speaker specified by the `id` query parameter.

**Example Request**

```
GET
https://get-native.com/speakers/show.json?id=123456
```

| Parameter   	| Description                   	| Required 	| Default 	|
|-------------	|-------------------------------	|:--------:	|---------	|
| id          	| The unique ID of the speaker. 	|     √    	|         	|

**Example Result**

| Data Field    | Type   	| Description                                        	|
|-------------	|--------	|----------------------------------------------------	|
| id          	| Int64  	| Integer representation of unique speaker ID        	|
| id_str      	| String 	| String representation of unique speaker ID         	|
| description 	| String 	| UTF-8 string description about speaker             	|
| name        	| String 	| The name of the speaker                            	|
| created_at  	| String 	| UTC datetime of speaker registration               	|
| lang        	| String 	| BCP 47 code for speakers' native language          	|
| gender      	| String 	| _Nullable._ The gender of the speaker               |
| location    	| String 	| _Nullable._ The location of the speaker            	|

```json
{
	"data": {
		"id": 123456,
		"id_str": "123456",
		"description": "Harold Ford is a man from Kansas City, MO. He loves the Chiefs and listens to samba.",
		"name": "Harold Ford",
		"created_at": "Sat Dec 14 04:35:55 +0000 2015",
		"lang": "en",
		"gender": "male",
		"location": "Kansas City, MO"
	},
	"success": true,
	"error": ""
}
```

TODO: Consider followers# GET /study/stats

Returns the authenticating users' aggregated study statistics.

**Example Request**

```
GET
https://get-native.com/study/stats
```

**Example Response**

| Data Field               	| Type   	| Description                                                                                          	|
|--------------------------	|--------	|------------------------------------------------------------------------------------------------------	|
| lang                     	| String 	| The language corresponding to the study session statistics included in the response                  	|
| total_time_studied       	| Int    	| The total amount of times that the authenticating user has spent studying                            	|
| consecutive_days         	| Int    	| The current number of consecutive days that the authenticating user has completed a study session    	|
| total_study_session      	| Int    	| The total number of study sessions that the authenticating user has completed to date                	|
| longest_consecutive_days 	| Int    	| The longest consecutive number of days that the authenticating user has completed a study session    	|
| maximum_words            	| Int    	| The maximum number of words that the authenticating user has typed during a writing session to date  	|
| maximum_wpm              	| Int    	| The maximum words per minute that the authenticating user has typed during a writing session to date 	|

```json
{
	"data": {
		"lang": "en",
		"consecutive_days": 12,
		"total_study_session": 45,
		"longest_consecutive_days": 12,
		"maximum_words": 502,
		"maximum_wpm": 52
	},
	"success": true,
	"error": ""
}
```
# GET /videos

Returns a collection of the most recently created videos in the Get Native database.

**Example Request**

```
GET
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

**Example Response**

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
```# GET /videos/search

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
# GET /videos/show/:id

Returns the video specified by the `id` query parameter.

**Example Request**

```
GET
https://get-native.com/videos/show.json?id=123456
```

| Parameter   	| Description                         	| Required 	| Default 	|
|-------------	|-------------------------------------	|:--------:	|---------	|
| id          	| The unique ID of the video.          	|     √    	|         	|

**Example Result**

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
					"id": 123456,
					"id_str": "123456",
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
# Global

All API responses contain the following root level parameters:

| Parameter 	| Type    	| Meaning                                                                                                                        	|
|-----------	|---------	|--------------------------------------------------------------------------------------------------------------------------------	|
| data      	| Object  	| The requested response data.                                                                                                   	|
| success   	| Boolean 	| When true, this indicates that the request was completed as expected.                                                          	|
| error     	| String  	| _Nullable._ If "success" is false, error is populated with a UTF-8 error message string describing why the transaction failed. 	|

In the case that a response contains 1 or more arrays, each array will contain a "count" parameter at their same level,
indicating the number of records included in the array.

```json
{
	"data": {
		"count": 45,
		"records": [
			{"id": 123},
			{"id": 456}
		]
	},
	"success": true,
	"error": ""
}
```
# POST /account/authenticate

Verify user credentials and create new login session.

TODO: Handle email, facebook, twitter, gmail?

**Example Request**

```
POST
https://get-native.com/account/authenticate.json
```

| Parameter   	| Description                                         	| Required 	| Default 	|
|-------------	|-----------------------------------------------------	|:--------:	|---------	|
| email        	| The email linked to the authenticating users' account	|     √    	|         	|
| password     	| The users' password                                 	|     √    	|         	|

**Example Response**

| Data Field            | Type           | Description                                                        |
|-----------------------|----------------|--------------------------------------------------------------------|
| id                    | Int64          |  Integer representation of unique user ID                          |
| id_str                | String         |  String representation of unique user ID                           |
| name                  | String         |  The user's self-declared real name                                |
| screen_name           | String         |  The user's self-declared screen name                              |
| created_at            | String         |  UTC datetime of account creation                                  |
| utc_offset            | Int            |  _Nullable._ Offset in seconds from UTC                            |
| time_zone             | String         |  _Nullable._ User declared Time Zone                               |
| lang                  | String         |  BCP 47 code for user declared language                            |
| profile_image_url     | String         |  HTTPS URI for user profile image                                  |
| default_profile_image | Boolean        | If true, the user has not uploaded their own image                 |
| email                 | String         | The user's email                                                   |
| favorites_count       | String         | Aggregate total number of videos favorited by user                 |
| notifications         | [Notification] | _Nullable._ An array of notifications for the authenticating user. |

```json
{
	"data": {
		"id": 2244994983,
		"id_str": "2244994983",
		"name": "John Doe",
		"screen_name": "john_doe",
		"created_at": "Sat Dec 14 04:35:55 +0000 2015",
		"utc_offset": 180000,
		"time_zone": "Pacific Time (US & Canada)",
		"lang": "en",
		"profile_image_url": "TODO",
		"default_profile_image": false,
		"email": "john_doe@example.com",
		"favorites_count": 45,
		"notifications": {
			"records": [
				{
					"id": 123456,
					"id_str": "123456",
					"text": "This is the body text of a notification",
					"title": "Welcome to Get Native"
				}
			],
			"count": 10
		}
	},
	"success": true,
	"error": ""
}
```
# POST /study

Create a new study session for the authenticating user.

**Example Request**

```
POST
https://get-native.com/study
```

| Parameter 	| Description                                                     	| Required 	| Default 	|
|-----------	|-----------------------------------------------------------------	|:--------:	|---------	|
| video     	| The unique ID of the video for the study session                	|     √    	|         	|
| time        | The user-specified amount of time in seconds of the study session	|     √    	|         	|

**Example Response**

| Data Field 	| Type   	| Description                                                       	|
|------------	|--------	|-------------------------------------------------------------------	|
| id         	| Int64  	| The unique ID of the newly created study session                  	|
| id_str     	| String 	| The string representation of the unique study session ID          	|
| video      	| Video  	| The video object corresponding to the newly created study session 	|

```json
{
	"data": {
		"id": 123456,
		"id_str": "123456",
		"video": {
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
	},
	"success": true,
	"error": ""
}
```
# POST /study/listening

Register the completion of a listening session.

**Example Request**

```
POST
https://get-native.com/account/study/listening
```

| Parameter     	| Description                                              	| Required 	| Default 	|
|---------------	|----------------------------------------------------------	|:--------:	|---------	|
| study_session  	| The unique ID of the current study session              	|     √    	|         	|

**Example Response**

```json
{
	"data": {},
	"success": true,
	"error": ""
}
```
# POST /study/shadowing

Register the completion of the shadowing session.

**Example Request**

```
POST
https://get-native.com/study/shadowing
```

| Parameter     	| Description                                              	| Required 	| Default 	|
|---------------	|----------------------------------------------------------	|:--------:	|---------	|
| study_session  	| The unique ID of the current study session              	|     √    	|         	|

**Example Response**

```json
{
	"data": {},
	"success": true,
	"error": ""
}
```
# POST /study/speaking

Register the completion of a speaking session.

**Example Request**

```
POST
https://get-native.com/account/study/speaking
```

| Parameter     	| Description                                              	| Required 	| Default 	|
|---------------	|----------------------------------------------------------	|:--------:	|---------	|
| study_session  	| The unique ID of the current study session              	|     √    	|         	|

**Example Response**

```json
{
	"data": {},
	"success": true,
	"error": ""
}
```
# POST /study/writing

Register the completion of a writing session.

**Example Request**

```
POST
https://get-native.com/study/writing
```

| Parameter     	| Description                                                                     	| Required 	| Default 	|
|---------------	|---------------------------------------------------------------------------------	|:--------:	|---------	|
| study_session 	| The unique ID of the study session corresponding to the current writing session 	|     √    	|         	|
| answer        	| The user written text answer to the writing question                            	|          	|         	|
| question      	| The unique ID of the question to which the user wrote an answer                 	|          	|         	|

### Calculation of words per minute and word count

As opposed to calculating the words per minute and word count of the user provided answer for the current study session
before sending the request, calculations are performed server side for maximum efficiency.

**Example Response**

```json
{
	"data": {},
	"success": true,
	"error": ""
}
```
# PUT /account/profile

Sets values that authenticating user can view from their Account page.

**Example Request**

```
PUT
https://get-native.com/account/update_profile.json
```

| Parameter   	| Description                                                      	| Required 	| Default 	|
|-------------	|------------------------------------------------------------------	|:--------:	|---------	|
| name        	| The users' self-declared real name.                              	|          	|         	|
| location    	| The users' non-normalized / non-geocoded self-declared location. 	|          	|         	|
| description 	| A description about the user.                                    	|          	|         	|
| password    	| The authenticating users' new password.                          	|          	|         	|

**Example Response**

| Data Field            | Type           | Description                                                        |
|-----------------------|----------------|--------------------------------------------------------------------|
| id                    | Int64          |  Integer representation of unique user ID                          |
| id_str                | String         |  String representation of unique user ID                           |
| name                  | String         |  The user's self-declared real name                                |
| screen_name           | String         |  The user's self-declared screen name                              |
| created_at            | String         |  UTC datetime of account creation                                  |
| utc_offset            | Int            |  _Nullable._ Offset in seconds from UTC                            |
| time_zone             | String         |  _Nullable._ User declared Time Zone                               |
| lang                  | String         |  BCP 47 code for user declared language                            |
| profile_image_url     | String         |  HTTPS URI for user profile image                                  |
| default_profile_image | Boolean        | If true, the user has not uploaded their own image                 |
| email                 | String         | The user's email                                                   |
| favorites_count       | String         | Aggregate total number of videos favorited by user                 |
| notifications         | [Notification] | _Nullable._ An array of notifications for the authenticating user. |

```json
{
	"data": {
		"id": 2244994983,
		"id_str": "2244994983",
		"name": "John Doe",
		"screen_name": "john_doe",
		"created_at": "Sat Dec 14 04:35:55 +0000 2015",
		"utc_offset": 180000,
		"time_zone": "Pacific Time (US & Canada)",
		"lang": "en",
		"profile_image_url": "TODO",
		"default_profile_image": false,
		"email": "john_doe@example.com",
		"favorites_count": 45,
		"notifications": {
			"records": [
				{
					"id": 123456,
					"id_str": "123456",
					"text": "This is the body text of a notification",
					"title": "Welcome to Get Native"
				}
			],
			"count": 10
		}
	},
	"success": true,
	"error": ""
}
```
# PUT /account/profile_image

Updates the profile image of the authenticating user.

**Example Request**

```
PUT
https://get-native.com/account/update_profile_image
```

| Parameter 	| Description                                               	| Required 	| Default 	|
|-----------	|-----------------------------------------------------------	|:--------:	|---------	|
| image     	| The base-64 encoded profile image.                        	|     √    	|         	|

**Example Response**

| Data Field            | Type           | Description                                                        |
|-----------------------|----------------|--------------------------------------------------------------------|
| id                    | Int64          |  Integer representation of unique user ID                          |
| id_str                | String         |  String representation of unique user ID                           |
| name                  | String         |  The user's self-declared real name                                |
| screen_name           | String         |  The user's self-declared screen name                              |
| created_at            | String         |  UTC datetime of account creation                                  |
| utc_offset            | Int            |  _Nullable._ Offset in seconds from UTC                            |
| time_zone             | String         |  _Nullable._ User declared Time Zone                               |
| lang                  | String         |  BCP 47 code for user declared language                            |
| profile_image_url     | String         |  HTTPS URI for user profile image                                  |
| default_profile_image | Boolean        | If true, the user has not uploaded their own image                 |
| email                 | String         | The user's email                                                   |
| favorites_count       | String         | Aggregate total number of videos favorited by user                 |
| notifications         | [Notification] | _Nullable._ An array of notifications for the authenticating user. |

```json
{
	"data": {
		"id": 2244994983,
		"id_str": "2244994983",
		"name": "John Doe",
		"screen_name": "john_doe",
		"created_at": "Sat Dec 14 04:35:55 +0000 2015",
		"utc_offset": 180000,
		"time_zone": "Pacific Time (US & Canada)",
		"lang": "en",
		"profile_image_url": "TODO",
		"default_profile_image": false,
		"email": "john_doe@example.com",
		"favorites_count": 45,
		"notifications": {
			"records": [
				{
					"id": 123456,
					"id_str": "123456",
					"text": "This is the body text of a notification",
					"title": "Welcome to Get Native"
				}
			],
			"count": 10
		}
	},
	"success": true,
	"error": ""
}
```