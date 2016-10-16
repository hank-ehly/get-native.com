# POST /study/writing

Modify the authenticating users writing statistics.

## Example Request

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

## Example Response

```json
{
	"data": {},
	"success": true,
	"error": ""
}
```
