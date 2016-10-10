# Global

All API responses contain the following root level parameters:

| Parameter 	| Type    	| Meaning                                                                                                                        	|
|-----------	|---------	|--------------------------------------------------------------------------------------------------------------------------------	|
| data      	| Object  	| The requested response data.                                                                                                   	|
| success   	| Boolean 	| When true, this indicates that the request was completed as expected.                                                          	|
| error     	| String  	| _Nullable._ If "success" is false, error is populated with a UTF-8 error message string describing why the transaction failed. 	|

In the case that a response contains 1 or more arrays, each array will contain a "count" parameter at their same level,
indicating the number of records included in the array.

```json
{
	"data": {
		"count": 45,
		"records": [
			{"id": 123},
			{"id": 456}
		]
	},
	"success": true,
	"error": ""
}
```
