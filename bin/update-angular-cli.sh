#!/usr/bin/env bash

set -e

if [[ ${#} -gt 0 && ${1} -eq 'debug' ]]; then
    set -x
fi

NPM_BIN=`which npm`

if [[ -z ${NPM_BIN} ]]; then
    echo "npm binary not found. Aborting."
    exit 0
fi

if [[ -d node_modules ]]; then
    rm -rf node_modules
fi

if [[ -f package-lock.json ]]; then
    rm -f package-lock.json
fi

if [[ -d dist ]]; then
    rm -rf dist
fi

${NPM_BIN} uninstall -g @angular/cli
${NPM_BIN} cache verify
${NPM_BIN} install -g @angular/cli@latest

if [[ -f package.json ]]; then
    ${NPM_BIN} install --save-dev @angular/cli@latest
    ${NPM_BIN} install
fi

set +x
