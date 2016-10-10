# GET /users/show

Returns information about the user specified by the `user_id` or `screen_name` query parameter.

## Example Request

```
https://get-native.com/users/show.json?id=123456
https://get-native.com/users/show.json?screen_name=jdoe
```

| Parameter   | Required | Default Value |
|-------------|:--------:|---------------|
| id          | √         |               |
| screen_name | √         |               |

※ Either the `id` or `screen_name` parameter is required.

## Example Response

| Field                 | Type         | Description                                        |
|-----------------------|--------------|----------------------------------------------------|
| id                    | Int64        |  Integer representation of unique user ID          |
| id_str                | String       |  String representation of unique user ID           |
| name                  | String       |  The user's self-declared real name                |
| screen_name           | String       |  The user's self-declared screen name              |
| created_at            | String       |  UTC datetime of account creation                  |
| utc_offset            | Int          |  _Nullable._ Offset in seconds from UTC            |
| time_zone             | String       |  _Nullable._ User declared Time Zone               |
| lang                  | String       |  BCP 47 code for user declared language            |
| profile_image_url     | String       |  HTTPS URI for user profile image                  |
| default_profile_image | Boolean      | If true, the user has not uploaded their own image |
| email                 | String       | The user's email                                   |
| favorites_count       | String       | Aggregate total number of videos favorited by user |
| notifications         | Notification | TODO                                               |

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
				// TODO
			]
			"count": 10
		}
	},
	"success": true,
	"error": ""
}
```
