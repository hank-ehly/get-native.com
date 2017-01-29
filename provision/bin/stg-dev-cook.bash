#!/usr/bin/env bash

set -e

read -p "You are about to provision the staging server. Continue? [y/N] "
CHOICE=`echo $REPLY | tr [:upper:] [:lower:]`

if [[ $CHOICE = 'y' ]]; then
        echo 'bundle exec knife solo cook root@stg.get-native.com -E staging -i ~/.ssh/stg.get-native.com/provision.web'
        bundle exec knife solo cook root@stg.get-native.com -E staging -i ~/.ssh/stg.get-native.com/provision.web
else
        echo 'Aborted.' && exit 0
fi

