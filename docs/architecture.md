<p><img src="/images/architecture.png" alt="Architecture"/></p>

### Physical Machines
The production web server server will be separated from the database server for security reasons.

### Operating System
Both the web server and database server will be built on the Ubuntu 16.04 LTS operating system.

### Deployment
Continuous deployment is performed through Circle CI. 
A successful staging or production build prompts automatic deployment to Digital Ocean droplet.

### Provisioning
A single Chef recipe is used to provision both staging and production environments.

| Specification                            	|                    	|
|------------------------------------------	|--------------------	|
| Operating System                         	| Ubuntu 16.04 LTS   	|
| Public domain                            	| get-native.com     	|
| Public API domain                        	| api.get-native.com 	|
| Production SSL/TLS Certificate Authority 	| letsencrypt.org    	|
| Web Server                               	| Apache 2.4         	|
| Web Server Protocol                      	| HTTP 2             	|

| Role                         	| Tool(s)                	| Programming Language  	|
|------------------------------	|------------------------	|-----------------------	|
| Deployment                   	| Circle CI / Capistrano 	| Bash / Ruby           	|
| Server Provisioning          	| Chef                   	| Ruby                  	|
| Server Application (API)     	| Express                	| JavaScript (Node.js)  	|
| Client Application (Browser) 	| Angular                	| HTML, CSS, JavaScript 	|
| Database                     	| MySql                  	| SQL                   	|
