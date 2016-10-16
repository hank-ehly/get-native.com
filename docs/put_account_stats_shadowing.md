# PUT /account/stats/shadowing

Modify the authenticating users shadowing statistics.

## Example Request

```
PUT
https://get-native.com/account/stats/shadowing
```

| Parameter 	| Description                                             	| Required 	| Default 	|
|-----------	|---------------------------------------------------------	|:--------:	|---------	|
| lang      	| The language of study                                   	|     √    	|         	|
| time      	| The amount of time, in seconds, of the shadowing section 	|     √    	|         	|
| video     	| The unique ID of the current video                      	|     √    	|         	|

## Example Response

```json
{
	"data": {},
	"success": true,
	"error": ""
}
```
