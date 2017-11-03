#!/usr/bin/env bash

if [ -z ${1} ]; then
    echo "Branch name required."
    exit 1;
fi

if [ "${1}" == "develop" ]; then
	sudo apt-get install rsync
	for locale in en ja; do
		npm run build -- \
			--env stg \
			--aot \
			--output-hashing=all \
			--sourcemaps=false \
			--extract-css=true \
			--output-path=dist/${locale} \
			--bh "/${locale}/" \
			--i18n-file=src/locales/messages.${locale}.xlf \
			--i18n-format=xlf \
			--locale=${locale} \
			--progress=false
	done
	/usr/bin/rsync -avze "ssh -o StrictHostKeyChecking=no" dist getnative@45.79.159.54:/var/www/stg.getnativelearning.com/current
elif [ "${1}" == "master" ]; then
	git clone git@github.com:hank-ehly/devops.getnativelearning.com.git
	cd devops.getnativelearning.com/deploy && bundle install --jobs 4 --path vendor/bundle && bundle exec cap client:production deploy
fi