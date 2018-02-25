#!/usr/bin/env bash

if [ -z ${1} ]; then
    echo "A branch name is required for deployment."
    exit 1;
fi

if [ "${1}" == "develop" ]; then
	sudo apt-get install rsync

	for app in 0 1; do
		[[ ${app} = 0 ]] && platform="browser" || platform="server"
		[[ ${app} = 0 ]] && oh="true" || oh="false"
	
		for locale in en ja; do
			npm run build -- \
				--app ${app} \
				--env stg \
				--aot \
				--output-hashing=${oh} \
				--sourcemaps=false \
				--extract-css=true \
				--output-path=dist/${platform}/${locale} \
				--bh "/${locale}/" \
				--i18n-file=src/locales/messages.${locale}.xlf \
				--i18n-format=xlf \
				--locale=${locale} \
				--progress=false
		done
	done

	/usr/bin/rsync -avze "ssh -o StrictHostKeyChecking=no" dist getnative@45.79.159.54:/var/www/stg.getnativelearning.com/current
elif [ "${1}" == "master" ]; then
	git clone git@github.com:hank-ehly/devops.getnativelearning.com.git
	cd devops.getnativelearning.com/deploy && bundle install --jobs 4 --path vendor/bundle && bundle exec cap client:production deploy
fi