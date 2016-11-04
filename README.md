# get-native.com

Source code for get-native.com

[![CircleCI](https://circleci.com/gh/hank-ehly/get-native.com.svg?style=svg&circle-token=c8cd7dd33921404431af97d9c9fab8c3714ec4fc)](https://circleci.com/gh/hank-ehly/get-native.com)

## Documentation

Documentation is built with MkDocs and is located in root level `docs/` folder.
To serve the documentation locally, execute `mkdocs serve` from the root directory.

## Provisioning

Prior to running any provisioning commands, please complete the following steps:

1. Verify that you are able to successfully SSH into your node without password authentication.
2. Copy provision/data_bags/github/credentials.json{.template,} and enter the appropriate values for each field.
    - Chef uses this information to manage your github deploy key.
    - GitHub credentials are not to committed to github.
    - Alternatively, if you wish to manage your deploy key without chef, remove the 'deploy-key' recipe from the appropriate run-list.
3. Copy provision/data_bags/{environment}-{role}/ssh.json{.template,} and paste any number of public SSH keys into the 'authorized_keys' array.
    - Chef adds each of these public keys to the 'get-native' users' 'authorized_keys' file.
    - SSH keys are not to committed to github.
4. If you are provisioning with the 'web-server' run-list, make sure that your DNS name server points to the IP address of the node you are about to provision.
    - Failure to complete this step will cause problems during SSL certificate creation.
    - Alternatively, if you wish to manage SSL certificate creation manually, remove the 'letsencrypt' recipe from the web-server run-list.
    
To provision a chef node, execute the following command -- replacing information in {brackets} as needed -- from the `provision` directory.

    $ bundle exec knife solo cook {user}@{hostname} -E {environment}

**Note:** Always specify an environment when executing `knife solo`. Possible options are listed in provision/environments (exclude the '.json')
