# GET /study/stats

Returns the authenticating users' aggregated study statistics.

## Example Request

```
GET
https://get-native.com/study/stats
```

## Example Response

| Data Field               	| Type   	| Description                                                                                          	|
|--------------------------	|--------	|------------------------------------------------------------------------------------------------------	|
| lang                     	| String 	| The language corresponding to the study session statistics included in the response                  	|
| total_time_studied       	| Int    	| The total amount of times that the authenticating user has spent studying                            	|
| consecutive_days         	| Int    	| The current number of consecutive days that the authenticating user has completed a study session    	|
| total_study_session      	| Int    	| The total number of study sessions that the authenticating user has completed to date                	|
| longest_consecutive_days 	| Int    	| The longest consecutive number of days that the authenticating user has completed a study session    	|
| maximum_words            	| Int    	| The maximum number of words that the authenticating user has typed during a writing session to date  	|
| maximum_wpm              	| Int    	| The maximum words per minute that the authenticating user has typed during a writing session to date 	|

```json
{
	"data": {
		"lang": "en",
		"consecutive_days": 12,
		"total_study_session": 45,
		"longest_consecutive_days": 12,
		"maximum_words": 502,
		"maximum_wpm": 52
	},
	"success": true,
	"error": ""
}
```
