#!/usr/bin/env bash

if [ -z ${1} ]; then
    echo "Branch name required."
    exit 1;
fi

if [ "${1}" == "develop" ]; then
	git clone git@github.com:hank-ehly/get-native.com-devops.git
	cd get-native.com-devops/deploy && bundle install --jobs 4 --path vendor/bundle && bundle exec cap client:staging deploy
elif [ "${1}" == "master" ]; then
	git clone git@github.com:hank-ehly/get-native.com-devops.git
	cd get-native.com-devops/deploy && bundle install --jobs 4 --path vendor/bundle && bundle exec cap client:production deploy
fi