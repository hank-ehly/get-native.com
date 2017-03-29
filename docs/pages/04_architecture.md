<p><img src="/images/architecture.png" alt="Architecture"/></p>

### Physical Machines
The production web server is hosted on a separate physical machine from the database server for security reasons.

### Operating System
Both the web server and database server will be built on Ubuntu 16.04 LTS.

### Deployment
Continuous deployment is performed through Circle CI. 
A successful staging or production build prompts automatic deployment to the appropriate machine.

### Provisioning
**Chef** is used to provision staging and production machines.

### DNS
Domain names and DNS settings are managed with <a href="https://www.namecheap.com/">**namecheap**</a>.

The following DNS records are in place to prevent our emails from being spoofed or filtered as spam.

| Record Type | Purpose                                                                                  |
|-------------|------------------------------------------------------------------------------------------|
| SPF         | Validates email sender to prevent spoofing                                               |
| DKIM        | Signs emails coming from your domain and tells everyone _how_ your signiture should look |
| ADSP        | An extension to DKIM which tells the receiver what to do if DKIM authentication fails    |
| DMARC       | Policy determining what should happen if one or both SPF & DKIM checks failed            |

### Hostnames
Hostnames follow the below naming scheme:
`{purpose}-{type}.{location}.{vendor}.{domain}`

The staging environment database servers' host name is `stg-db.nnj.ln.get-native.com`

- `stg` because the purpose of this server is to be a staging environment host
- `db` because it is a database server
- `nnj` for Newark NJ
- `ln` for Linode
- `get-native.com` for our domain name

### Other

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
