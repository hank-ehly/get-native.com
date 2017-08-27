for lang in ${@}; do 
    npm run build -- \
        --env stg \
        --aot \
        --output-hashing=all \
        --sourcemaps=false \
        --extract-css=true \
        --output-path=dist/${lang} \
        --bh /${lang}/ \
        --i18n-file=src/locales/messages.${lang}.xlf \
        --i18n-format=xlf \
        --locale=${lang} \
        --progress=false; 
done
