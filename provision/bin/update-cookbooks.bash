#!/usr/bin/env bash

set -e

if [ -d cookbooks ]; then 
    rm -rf cookbooks
fi

bundle exec berks update
bundle exec berks vendor cookbooks

