#!/usr/bin/env bash

function __help() {
	echo ""
	echo "Ex: npm run build -- [staging|production]"
	echo ""
}

if [ -z ${1} ]; then
	__help
	exit 1
elif [ ${1} != "production" ] && [ ${1} != "staging" ]; then
	__help
	exit 1
fi

[[ ${1} = "production" ]] && env="prod" || env="stg"

for platform in browser server; do
	[[ ${platform} = "browser" ]] && app="0" || app="1"
	[[ ${platform} = "browser" ]] && oh="all" || oh="false"

	for locale in en ja; do
			npm run ng -- build \
					--app ${app} \
					--env ${env} \
					--aot \
					--output-hashing=${oh} \
					--sourcemaps=false \
					--extract-css=true \
					--output-path=dist/${platform}/${locale} \
					--bh /${locale}/ \
					--i18n-file=src/locales/messages.${locale}.xlf \
					--i18n-format=xlf \
					--locale=${locale} \
					--progress=false;
	done
done
