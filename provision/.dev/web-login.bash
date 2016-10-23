#!/usr/bin/env bash

ssh ubuntu@127.0.0.1 -p 2222 \
                     -o "UserKnownHostsFile /dev/null" \
                     -o "StrictHostKeyChecking no" \
                     -o "PasswordAuthentication no" \
                     -o "IdentitiesOnly yes" \
                     -o "LogLevel FATAL" \
                     -o "IdentityFile ~/Sites/get-native.com/provision/.dev/keys/dev.web.get-native.com"
