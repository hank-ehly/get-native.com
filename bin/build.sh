#!/usr/bin/env bash

for platform in browser server; do
	[[ ${platform} = "browser" ]] && app="0" || app="1"
	[[ ${platform} = "browser" ]] && oh="all" || oh="false"

	for locale in en ja; do
			npm run build -- \
					--app ${app} \
					--env prod \
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

npm run webpack -- --config webpack.server.config.js
