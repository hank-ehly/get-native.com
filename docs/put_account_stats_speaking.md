# PUT /account/stats/speaking

Modify the authenticating users speaking statistics.

## Example Request

```
PUT
https://get-native.com/account/stats/speaking
```

| Parameter 	| Description                                             	| Required 	| Default 	|
|-----------	|---------------------------------------------------------	|:--------:	|---------	|
| lang      	| The language of study                                   	|     √    	|         	|
| time      	| The amount of time, in seconds, of the speaking section 	|     √    	|         	|
| video     	| The unique ID of the current video                      	|     √    	|         	|

## Example Response

```json
{
	"data": {},
	"success": true,
	"error": ""
}
```
