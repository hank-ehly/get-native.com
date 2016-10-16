# PUT /account/stats/writing

Modify the authenticating users writing statistics.

## Example Request

```
PUT
https://get-native.com/account/stats/writing
```

| Parameter 	| Description                                            	| Required 	| Default 	|
|-----------	|--------------------------------------------------------	|:--------:	|---------	|
| lang      	| The language of study                                  	|     √    	|         	|
| time      	| The amount of time, in seconds, of the writing section 	|     √    	|         	|
| video     	| The unique ID of the current video                     	|     √    	|         	|

## Example Response

```json
{
	"data": {},
	"success": true,
	"error": ""
}
```
