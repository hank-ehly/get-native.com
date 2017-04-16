# Overview

**Request Headers**

The following headers are to be included in requests for _protected_ resources.
 
| Key           | Value               |
| ------------- | ------------------- |
| Authorization | Bearer {Auth Token} |

**Response Headers**

The following headers can be found in all API responses.

| Key                                                                                                                         | Value                                        |
| --------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options">X-Content-Type-Options</a>       | nosniff                                      |
| <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-XSS-Protection">X-XSS-Protection</a>                   | 1; mode=block                                |
| Access-Control-Allow-Origin                                                                                                 | https://{stg.,}get-native.com                |
| Access-Control-Expose-Headers                                                                                               | X-GN-Auth-Token, X-GN-Auth-Expire            |
| Server                                                                                                                      | api.get-native.com                           |
| <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security">Strict-Transport-Security</a> | max-age=31536000; includeSubDomains; preload |

The following headers are included in API responses that require authentication.

| Key                                                                                                                         | Value                                        |
| --------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| X-GN-Auth-Token                                                                                                             | A JWT value (eg. g8ka.l0xh.jq1m)             |
| X-GN-Auth-Expire                                                                                                            | A timestamp (eg. 1483658645131)              |

**Error Codes & Responses**

| Code | Text                  | Description                                                                                 |
|------|-----------------------|---------------------------------------------------------------------------------------------|
| 200  | OK                    | The request was successful.                                                                 |
| 204  | No Content            | The request was successful but no response body is sent.                                    |
| 400  | Bad Request           | The request failed because it was invalid. The specific reason is included in the response. |
| 401  | Unauthorized          | The request authentication credentials were missing or invalid.                             |
| 404  | Not Found             | The requested resource for the given request method does not exist.                         |
| 500  | Internal Server Error | The request failed because something has gone wrong on the server side.                     |

**Error Messages**

Error messages may accompany responses to failed requests. If the response contains an error message, it will be in the following JSON format:

```json
{
    "errors": [
        {
            "message": "This email address is already in use.",
            "code": 121
        }
    ]
}
```

**Handling of the `DNT` Request Header**

Clients that set the value of the `Do Not Track` header to `1` are treated differently.
Specifically, Get Native does the following upon encountering a `DNT: 1` request header. 

1. Disables Google Analytics
2. Prevents Apache from logging user access

**Record Lists**

In the case that a response contains 1 or more arrays, each array will contain a "count" parameter at their same level,
indicating the number of records included in the array.

```json
{
	"videos": {
		"count": 2,
		"records": [ /* Object, Object */ ]
	}
}
```

# GET /account

Returns information about the currently logged in user.

```
GET https://api.get-native.com/account
```

**Response**

| Data Field                    | Type           | Description                                                        |
|-------------------------------|----------------|--------------------------------------------------------------------|
| id                            | Int64          |  Integer representation of unique user ID                          |
| email                         | String         |  The user's email address                                          |
| browser_notifications_enabled | Boolean        |  Whether the user allows browser notifications.                    |
| email_notifications_enabled   | Boolean        |  Whether the user allows email notifications.                      |
| default_study_language_code   | String         |  BCP 47 code for user default study language                       |
| picture_url                   | String         |  HTTPS URI for user profile image                                  |
| is_silhouette_picture         | Boolean        | If true, the user has not uploaded their own image                 |

```
Status: 200 OK
```
```json
{
    "id": 2244994983,
    "email": "test@email.com",
    "browser_notifications_enabled": false,
    "email_notifications_enabled": false,
    "email_verified": false,
    "default_study_language_code": "en",
    "picture_url": "https://dummyimage.com/100x100.png/5fa2dd/ffffff",
    "is_silhouette_picture": false
}
```

# DELETE /account

Deactivate the account of the currently logged in user.

Todo: Define specific account deletion technique.

```
DELETE https://api.get-native/account
```

**Response**

```
Status: 204 No Content
```

# PATCH /account

**Parameters**

|  Parameter | Description | Required | Default |
|  ------ | ------ | ------ | ------ |
|  email_notifications_enabled | A boolean value describing whether the user wishes to receive notifications by email |  |  |
|  browser_notifications_enabled | A boolean value describing whether the user wishes to allow browser notifications |  |  |
|  default_study_language_code | A BCP 47 code describing the language in which videos will appear on user login |  |  |

**Response**

```
Status 204 No Content
```

# POST /account/email

Todo: Email verification API
Todo: Email 'not verified yet' message in UI

Update the authenticating user's email address.

```
POST https://api.get-native.com/account/email
```

**Parameters**

| Parameter   	| Description                                                      	| Required 	| Default 	|
|-------------	|------------------------------------------------------------------	|:--------:	|---------	|
| email        	| The users' new email address.                                   	|     √    	|         	|

```json
{
	"email": "jack.sparrow@email.com"
}
```

**Response**

```
Status 204 No Content
```

# POST /account/password

Updates the authenticating users' login password.

**Parameters**

| Parameter        	| Description                                                      	| Required 	| Default 	|
|------------------	|------------------------------------------------------------------	|:--------:	|---------	|
| new_password    	| The authenticating users' new password.                          	|     √    	|         	|
| current_password 	| The authenticating users' current password.                      	|     √    	|         	|

```json
{
	"new_password": "8h45lJ0E",
	"current_password": "12345678"
}
```

**Response**

```
Status 204 No Content
```

# POST /account/profile_image

Updates the profile image of the authenticating user.

```
POST https://api.get-native.com/account/profile_image
```

**Parameters**

| Parameter 	| Description                                               	| Required 	| Default 	|
|-----------	|-----------------------------------------------------------	|:--------:	|---------	|
| image     	| The base-64 encoded profile image.                         	|     √    	|         	|

```json
{
	"image": "sjhg3huhsuhuhfh82h9823ja911hdfjsls0 ..."
}
```

**Response**

```
Status 204 No Content
```

# GET /categories

Returns a list of the current video categories and their subcategories.

```
GET https://api.get-native.com/categories
```

**Response**

| Data Field 	| Type        	| Description                                               	|
|------------	|-------------	|-----------------------------------------------------------  |
| records    	| [Category]  	| The array of Category records.                            	|
| count      	| Int         	| The number of Category records included in the response.    |

```
Status: 200 OK
```
```json
{
    "records": [
        {
            "id": 1,
            "name": "Business",
            "subcategories": {
                "records": [
                    {
                        "id": 1,
                        "name": "Meeting Preparation"
                    },
                    {
                        "id": 2,
                        "name": "Business Cards"
                    },
                    {
                        "id": 3,
                        "name": "Greeting Co-Workers"
                    }
                ],
                "count": 3
            }
        },
        {
            "id": 2,
            "name": "Holidays",
            "subcategories": {
                "records": [
                    {
                        "id": 4,
                        "name": "Holding Hands"
                    },
                    {
                        "id": 5,
                        "name": "Meeting the Parents"
                    }
                ],
                "count": 2
            }
        },
        {
            "id": 3,
            "name": "Travel",
            "subcategories": {
                "records": [
                    {
                        "id": 6,
                        "name": "Subcategory 1"
                    },
                    {
                        "id": 7,
                        "name": "Subcategory 2"
                    },
                    {
                        "id": 8,
                        "name": "Subcategory 3"
                    },
                    {
                        "id": 9,
                        "name": "Subcategory 4"
                    },
                    {
                        "id": 10,
                        "name": "Subcategory 5"
                    }
                ],
                "count": 5
            }
        },
        {
            "id": 4,
            "name": "School",
            "subcategories": {
                "records": [
                    {
                        "id": 11,
                        "name": "First Day"
                    },
                    {
                        "id": 12,
                        "name": "Making Friends"
                    }
                ],
                "count": 2
            }
        },
        {
            "id": 5,
            "name": "Transportation",
            "subcategories": {
                "records": [
                    {
                        "id": 13,
                        "name": "Taking the Train"
                    },
                    {
                        "id": 14,
                        "name": "Riding Horses"
                    },
                    {
                        "id": 15,
                        "name": "Bus Passes"
                    },
                    {
                        "id": 16,
                        "name": "Taking Long Road Trips"
                    }
                ],
                "count": 4
            }
        }
    ],
    "count": 5
}
```

# POST /login

Verify user credentials and create new login session.

TODO: Handle email, facebook, twitter, gmail?

```
POST https://api.get-native.com/login
```

**Parameters**

| Parameter   	| Description                                         	| Required 	| Default 	|
|-------------	|-----------------------------------------------------	|:--------:	|---------	|
| email        	| The email linked to the authenticating users' account	|     √    	|         	|
| password     	| The users' password                                 	|     √    	|         	|

```json
{
	"email": "foo@bar.com",
	"password": "password"
}
```

**Response**

| Data Field                    | Type           | Description                                                        |
|-------------------------------|----------------|--------------------------------------------------------------------|
| id                            | Int64          |  Integer representation of unique user ID                          |
| email                         | String         |  The user's email address                                          |
| browser_notifications_enabled | Boolean        |  Whether the user allows browser notifications.                    |
| email_notifications_enabled   | Boolean        |  Whether the user allows email notifications.                      |
| default_study_language_code   | String         |  BCP 47 code for user default study language                       |
| picture_url                   | String         |  HTTPS URI for user profile image                                  |
| is_silhouette_picture         | Boolean        | If true, the user has not uploaded their own image                 |

```
Status: 200 OK
```
```json
{
    "id": 2244994983,
    "email": "test@email.com",
    "browser_notifications_enabled": false,
    "email_notifications_enabled": false,
    "email_verified": false,
    "default_study_language_code": "en",
    "picture_url": "https://dummyimage.com/100x100.png/5fa2dd/ffffff",
    "is_silhouette_picture": false
}
```

# DELETE /notifications/:id

Delete a notification for the authenticating user.

```
DELETE https://api.get-native.com/notifications/123456
```

**Parameters**

| Parameter 	| Description                           | Required 	| Default 	|
|-----------	|---------------------------------------|:--------:	|---------	|
| id        	| The id of the notification to delete. |     √    	|         	|

**Response**

```
Status: 204 No Content
```

# POST /register

Create a new user and log them in.

TODO: Handle email, facebook, twitter, gmail?

```
POST https://api.get-native.com/register
```

**Parameters**

| Parameter   	| Description                                         	| Required 	| Default 	|
|-------------	|-----------------------------------------------------	|:--------:	|---------	|
| email        	| The email linked to the authenticating users' account	|     √    	|         	|
| password     	| The users' password                                 	|     √    	|         	|

```json
{
	"email": "foo@bar.com",
	"password": "password"
}
```

**Response**

| Data Field            | Type           | Description                                                        |
|-----------------------|----------------|--------------------------------------------------------------------|
| id                    | Int64          |  Integer representation of unique user ID                          |
| name                  | String         |  The user's self-declared real name                                |
| created_at            | String         |  UTC datetime of account creation                                  |
| utc_offset            | Int            |  _Nullable._ Offset in seconds from UTC                            |
| lang                  | String         |  BCP 47 code for user declared language                            |
| profile_image_url     | String         |  HTTPS URI for user profile image                                  |
| default_profile_image | Boolean        | If true, the user has not uploaded their own image                 |
| email                 | String         | The user's email                                                   |
| email_verified        | Boolean        | Whether the user has verified their email address.                 |
| notifications         | [Notification] | _Nullable._ An array of notifications for the authenticating user. |

```
Status: 200 OK
```
```json
{
	"id": 2244994983,
	"name": "John Doe",
	"created_at": "Sat Dec 14 04:35:55 +0000 2015",
	"utc_offset": 180000,
	"lang": "en",
	"profile_image_url": "TODO",
	"default_profile_image": false,
	"email": "john_doe@example.com",
	"email_verified": false,
	"notifications": {
		"records": [
			{
				"id": 123456,
				"text": "This is the body text of a notification",
				"title": "Welcome to Get Native"
			}
		],
		"count": 10
	}
}
```

# GET /speakers/:id

Returns information about the speaker specified by the `id` query parameter.

```
GET https://api.get-native.com/speakers/123456
```

**Parameters**

| Parameter   	| Description                   	| Required 	| Default 	|
|-------------	|-------------------------------	|:--------:	|---------	|
| id          	| The unique ID of the speaker. 	|     √    	|         	|

**Response**

| Data Field                    | Type           | Description                                                        |
|-------------------------------|----------------|--------------------------------------------------------------------|
| id                            | Int64          | Integer representation of unique speaker ID                        |
| description                   | String         | A textual description about the speaker                            |
| name                          | String         | The speaker's ready-for-display name                               |
| location                      | String         | From where the speaker considers their dialect to have its origins | 
| picture_url                   | String         | HTTPS URI for speaker profile image                                |
| is_silhouette_picture         | Boolean        | If true, the speaker has chosen to use the silhouette image        |


```
Status: 200 OK
```
```json
{
	"id": 123456,
	"description": "Harold Ford is a man from Kansas City, MO. He loves the Chiefs and listens to samba.",
	"name": "Harold Ford",
	"location": "Kansas City, MO",
	"picture_url": "XXX",
	"is_silhouette_picture": false
}
```

Todo: Consider followers

# POST /study

Create a new study session for the authenticating user.

```
POST https://api.get-native.com/study
```

**Parameters**

| Parameter 	| Description                                                     	| Required 	| Default 	|
|-----------	|-----------------------------------------------------------------	|:--------:	|---------	|
| video_id   	| The unique ID of the video for the study session                	|     √    	|         	|
| time        | The user-specified amount of time in seconds of the study session	|     √    	|         	|

```json
{
	"video_id": 456,
	"time": 900
}
```

**Response**

| Data Field 	| Type   	| Description                                                       	|
|------------	|--------	|-------------------------------------------------------------------	|
| id         	| Int64  	| The unique ID of the newly created study session                  	|
| video      	| Video  	| The video object corresponding to the newly created study session 	|

```json
{
	"id": 123456,
	"video": {
		"cued": true,
			"created_at": "Sat Dec 14 04:35:55 +0000 2015",
			"id": 2244994983,
			"speaker": {
				"id": 123456,
				"description": "Harold Ford is a man from Kansas City, MO. He loves the Chiefs and listens to samba.",
				"name": "Harold Ford",
				"created_at": "Sat Dec 14 04:35:55 +0000 2015",
				"lang": "en",
				"gender": "male",
				"location": "Kansas City, MO"
			},
			"lang": "en",
			"subcategory": {
				"id": 123456,
				"created_at": "Sat Dec 14 04:35:55 +0000 2015",
				"name": "Talking to customers"
			},
			"loop_count": 7156,
			"loop_velocity": 2.4960000000000004,
			"thumbnail_image_url": "TODO",
			"video_url": "TODO",
			"has_related_videos": true,
			"likes": {
				"records": [
					{
						"created_at": "Sat Dec 14 04:35:55 +0000 2015",
						"id": 456
					}
				],
				"count": 10
			},
			"length": 68
	}
}
```

# GET /study/stats/:lang

Returns the authenticating users' aggregated study statistics.

| Parameter         	| Description                                                    	| Required 	| Default 	|
|-------------------	|---------------------------------------------------------------	|:--------:	|---------	|
| lang               	| The language for which the study stats are presented           	|     √    	|         	|

```
GET https://api.get-native.com/study/stats/en
```

**Response**

| Data Field               	| Type   	| Description                                                                                          	|
|--------------------------	|--------	|------------------------------------------------------------------------------------------------------	|
| lang                     	| String 	| The language corresponding to the study session statistics included in the response                  	|
| total_time_studied       	| Int    	| The total amount of times that the authenticating user has spent studying                            	|
| consecutive_days         	| Int    	| The current number of consecutive days that the authenticating user has completed a study session    	|
| total_study_sessions     	| Int    	| The total number of study sessions that the authenticating user has completed to date                	|
| longest_consecutive_days 	| Int    	| The longest consecutive number of days that the authenticating user has completed a study session    	|
| maximum_words            	| Int    	| The maximum number of words that the authenticating user has typed during a writing session to date  	|
| maximum_wpm              	| Int    	| The maximum words per minute that the authenticating user has typed during a writing session to date 	|

```
Status: 200 OK
```
```json
{
	"lang": "en",
	"consecutive_days": 12,
	"total_study_sessions": 45,
	"longest_consecutive_days": 12,
	"maximum_words": 502,
	"maximum_wpm": 52
}
```

# POST /study/writing_answers

Register a writing answer.

```
POST https://api.get-native.com/study/writing_answers
```

**Parameters**

| Parameter         	| Description                                                    	| Required 	| Default 	|
|-------------------	|---------------------------------------------------------------	|:--------:	|---------	|
| study_session_id  	| The unique ID of the current study session                     	|     √    	|         	|
| writing_question_id | The unique ID of the question to which the user wrote an answer	|     √    	|         	|
| answer             	| The user written text answer to the writing question           	|     √    	|         	|

```json
{
	"study_session_id": 123,
	"writing_question_id": 57,
	"answer": "I really like.."
}
```

**Calculation of _words per minute_ and _word count_**

As opposed to calculating the words per minute and word count of the user provided answer for the current study session
before sending the request, calculations are performed server side for maximum efficiency.

**Response**

```
Status: 204 No Content
```

# GET /study/writing_answers/:lang

```
GET https://api.get-native.com/study/writing_answers/ja?since=1483658645131
```

**Parameters**

| Parameter         	| Description                                                    	| Required 	| Default 	|
|-------------------	|---------------------------------------------------------------	|:--------:	|---------	|
| since  	            | UTC datetime specifying the oldest possible search result      	|          	|         	|
| max_id  	          | UTC datetime specifying the oldest possible search result      	|          	|         	|
| lang     	          | The language for which the writing answers are presented       	|     √    	|         	|

**Response**
```
Status: 200 OK
```
```json
{
	"count": 1,
	"records": [
		{
			"id": 1,
			"answer": "This is a test answer",
			"created_at": "Wed Jan 11 04:35:55 +0000 2017",
			"study_session_id": 58,
			"lang": "ja",
			"writing_question": {
				"text": "How do you ...?"
			}
		}	
	]
}
```

# GET /videos

Returns an array of video objects matching the specified search query. 
If no search query is present, returns a list of the most recently created videos.

```
GET https://api.get-native.com/videos?q=Business%20Ethics&lang=en&cued_only=true
```

**Parameters**

| Parameter       	| Description                                                                                                                      	| Required 	| Default 	|
|-----------------	|----------------------------------------------------------------------------------------------------------------------------------	|:--------:	|---------	|
| lang            	| Restricts videos to the given language, specified by an [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) code. 	|          	|    en    	|
| count           	| The number of videos to include in the response.                                                                                 	|          	|    9    	|
| max_id          	| Returns only videos with an ID less than or equal to the max_id.                                                                 	|          	|         	|
| subcategory_id    | Restricts videos to the given subcategory.                                                                                        |           |           |
| category_id       | Restricts videos to the given category. If the subcategory_id parameter is also included, the category_id parameter is ignored.   |           |           |
| q                 | A URL-encoded UTF-8 search query. Maximum length is 100 characters.                                                               |           |           |
| cued_only         | Either 'true' or 'false' -- whether to return only videos in the authenticated users' cue.                                        |           |   false   |

**About _max_id_**

Instead of listing videos in "pages," Get Native returns videos according to the `count` and `max_id` parameters. 
When you've retrieved an initial array of videos using the `/videos` URI, make note of the _lowest_ video ID. 
When you're ready to _Load More_ videos, specify the lowest video ID in the `max_id` field to retrieve another batch of 
videos whose IDs are _lower than or equal to_ the specified `max_id`. The lower the video ID, the older the video.

**Response**

| Data Field | Type    | Description                                   |
|------------|---------|-----------------------------------------------|
| count      | Int     | The number of videos included in the response |
| records    | [Video] | The array of video objects                    |

```
Status: 200 OK
```
```json
{
	"count": 2,
	"records": [
		{
			"created_at": "Sat Dec 14 04:35:55 +0000 2015",
			"id": 1,
			"speaker": {
					"name": "Harold Ford"
			},
			"subcategory": {
					"name": "Talking to customers",
					"id": 123
			},
			"loop_count": 7156,
			"loop_velocity": 2.4960000000000004,
			"thumbnail_image_url": "XXX",
			"video_url": "../../../assets/mock/video.mov",
			"length": 68,
			"cued": true
		},
		{
			"created_at": "Wed Jan 11 04:35:55 +0000 2017",
			"id": 2,
			"speaker": {
					"name": "Benjamin Franklin"
			},
			"subcategory": {
					"name": "How to change a light-bulb",
					"id": 456
			},
			"loop_count": 1011,
			"loop_velocity": 2.4960000000000004,
			"thumbnail_image_url": "XXX",
			"video_url": "../../../assets/mock/video.mov",
			"length": 73,
			"cued": false
		}
	]
}
```

# GET /videos/:id

Returns the video specified by the `id` query parameter.

```
GET https://api.get-native.com/videos/123456
```

**Parameters**

| Parameter   	| Description                         	| Required 	| Default 	|
|-------------	|-------------------------------------	|:--------:	|---------	|
| id          	| The unique ID of the video.          	|     √    	|         	|

**Response**

| Data Field          | Type         | Description                                                                                        |
|---------------------|--------------|----------------------------------------------------------------------------------------------------|
| cued                | Boolean      | _Nullable._ Whether the video has been cued by the user                                            |
| description         | String       | A string description of the video.                                                                 |
| id                  | Int64        | Integer representation of unique video ID                                                          |
| speaker             | Speaker      | The speaker of the video                                                                           |
| subcategory         | subcategory  | The subcategory to which the video belongs                                                         |
| loop_count          | Int          | The number of times a video has reached the end of its length                                      |
| loop_velocity       | Float        | _Nullable._ The velocity at which the loop count should automatically increase                     |
| thumbnail_image_url | String       | The HTTPS URL for the video thumbnail image                                                        |
| video_url           | String       | The HTTPS URL for the actual video data                                                            |
| related_videos      | [Video]      | An entity list containing Video objects deemed as 'related' to the current video                   |
| like_count          | Int64        | Integer representation of number of times video has been 'liked'                                   |
| liked               | Boolean      | Whether the video has been liked by the user                                                       |
| length              | Int          | The length of the video in seconds                                                                 |
| transcripts         | [Transcript] | An array of transcript objects corresponding to the video.                                         |

```
Status: 200 OK
```
```json
{
	"cued": true,
	"description": "In 'talking to customers,' Harold Ford describes the daily interactions between businessmen and clients.",
	"id": 2244994983,
	"speaker": {
		"id": 123456,
		"description": "Harold Ford is a man from Kansas City, MO. He loves the Chiefs and listens to samba.",
		"name": "Harold Ford",
		"thumbnail_image_url": "XXX"
	},
	"subcategory": {
		"id": 123456,
		"name": "Talking to customers"
	},
	"loop_count": 7156,
	"loop_velocity": 2.4960000000000004,
	"thumbnail_image_url": "XXX",
	"video_url": "XXX",
	"related_videos":{
		"records": [
			{
				"id": 2,
				"created_at": "Sat Dec 14 04:35:55 +0000 2015",
				"length": 68,
				"loop_count": 25,
				"subcategory": {
					"name": "How to fly a kite"
				},
				"speaker": {
					"name": "Benjamin Franklin"
				}
			},
			{
				"id": 3,
				"created_at": "Tue Jun 9 12:00:00 +0000 2015",
				"length": 80,
				"loop_count": 102,
				"subcategory": {
					"name": "Writing a memoir"
				},
				"speaker": {
					"name": "Thomas Jefferson"
				}
			}
		],
		"count": 2
	},
	"liked": true,
	"like_count": 10,
	"length": 68,
	"transcripts": {
		"count": 2,
		"records": [
			{
				"id": 123,
				"text": "This is the English transcript. This is the text that will be displayed on the video detail page.",
				"lang": "en",
				"collocations": {
					"count": 3,
					"records": [
						{
							"text": "This is the text",
							"description": "This is the description",
							"pronunciation": "ˈðɪs ˈɪz ðə ˈtɛkst",
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
	}
}
```

# POST /videos/:id/like

Like a video.

```
POST https://api.get-native.com/videos/12345/like
```

**Parameters**

| Parameter 	| Description                                                     	| Required 	| Default 	|
|-----------	|-----------------------------------------------------------------	|:--------:	|---------	|
| id         	| The unique ID of the video to like                	              |     √    	|         	|


**Response**

```
Status: 204 No Content
```

# POST /videos/:id/unlike

_Unlike_ a previously liked video.

```
POST https://api.get-native.com/videos/12345/unlike
```

**Parameters**

| Parameter 	| Description                                                     	| Required 	| Default 	|
|-----------	|-----------------------------------------------------------------	|:--------:	|---------	|
| id         	| The unique ID of the video to unlike              	              |     √    	|         	|


**Response**

```
Status: 204 No Content
```
