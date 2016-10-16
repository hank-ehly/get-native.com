# PUT /account/stats/listening

Modify the authenticating users listening statistics.

## Example Request

```
PUT
https://get-native.com/account/stats/listening
```

| Parameter 	| Description                                              	| Required 	| Default 	|
|-----------	|----------------------------------------------------------	|:--------:	|---------	|
| lang      	| The language of study                                    	|     √    	|         	|
| time      	| The amount of time, in seconds, of the listening section 	|     √    	|         	|
| video     	| The unique ID of the current video                       	|     √    	|         	|

## Example Response

```json
{
	"data": {},
	"success": true,
	"error": ""
}
```
