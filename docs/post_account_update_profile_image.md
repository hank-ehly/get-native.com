# POST /account/update_profile_image

Updates the profile image of the authenticating user.

## Example Request

```
https://get-native.com/account/update_profile_image
```

| Parameter 	| Description                                               	| Required 	| Default 	|
|-----------	|-----------------------------------------------------------	|:--------:	|---------	|
| image     	| The base-64 encoded profile image.                        	|     √    	|         	|

## Example Response

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
