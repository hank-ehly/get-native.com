# GET /speakers/show

Returns information about the speaker specified by the `id` query parameter.

## Example Request

```
https://get-native.com/speakers/show.json?id=123456
```

| Parameter | Required | Default Value |
|-----------|:--------:|---------------|
| id        | √         |               |

## Example Result

| Field       	| Type   	| Description                                        	|
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

TODO: Consider followers