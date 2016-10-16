# PUT /account/stats/writing

Modify the authenticating users writing statistics.

## Example Request

```
PUT
https://get-native.com/account/stats/writing
```

| Parameter        	| Description                                            	| Required 	| Default 	|
|------------------	|--------------------------------------------------------	|:--------:	|---------	|
| lang             	| The language of study                                  	|     √    	|         	|
| time             	| The amount of time, in seconds, of the writing section 	|     √    	|         	|
| video            	| The unique ID of the current video                     	|     √    	|         	|
| question         	| The unique ID of the current writing question          	|     √    	|         	|
| answer           	| The users' text answer to the writing question         	|     √    	|         	|
| word_count       	|  The number of words or Kanji characters in the answer 	|     √    	|         	|
| words_per_minute 	| The WPM calculated during the current writing section  	|     √    	|         	|

## Example Response

```json
{
	"data": {},
	"success": true,
	"error": ""
}
```
