# get-native.com

Source code for get-native.com

[![CircleCI](https://circleci.com/gh/hank-ehly/get-native.com.svg?style=svg&circle-token=c8cd7dd33921404431af97d9c9fab8c3714ec4fc)](https://circleci.com/gh/hank-ehly/get-native.com)

## Documentation

Documentation is built with MkDocs and is located in root level `docs/` folder.
To serve the documentation locally, execute `mkdocs serve` or `npm run serve.docs` from the root directory.

## Provisioning

Before running the chef provisioning scripts located in provision/roles, you must complete the following steps:

1. Make sure that you are able to successfully SSH into your node without password authentication.
2. Copy provision/data_bags/github/credentials.json{.template,} and enter the necessary credentials.
    - Chef will manage your github deploy key.
3. Copy provision/data_bags/{environment}-{role}/ssh.json{.template,} and paste your public SSH key.
    - Chef will add your public key to the 'get-native' users' 'authorized_keys' list.
4. If you are running the 'web-server' run-list, make sure that your DNS name server points to the IP address of the node you are about to provision.
    - Failure to complete this step will cause problems when chef attempts to create an SSL certificate.
    - Alternatively, if you wish to disable SSL certificate creation, remove the "letsencrypt" recipe from the web-server run-list.
    
To begin provisioning, execute the following command -- replacing login information as needed.

    $ bundle exec knife solo cook {user}@{hostname} -E {environment}

**Note:** Always specify an environment. Possible options are listed in provision/environments (exclude the '.json')
