/**
 * lang.service
 * getnative.org
 *
 * Created by henryehly on 2016/12/29.
 */

import { Inject, Injectable, LOCALE_ID } from '@angular/core';

import { LanguageCode } from '../typings/language-code';
import { Language } from '../typings/language';
import { Languages } from './languages';
import { i18n } from './i18n';

import * as _ from 'lodash';

@Injectable()
export class LangService {

    constructor(@Inject(LOCALE_ID) private localeId: string) {
    }

    codeToName(code: LanguageCode): string {
        for (const lang of Languages) {
            if (lang.code === code) {
                return lang.name;
            }
        }

        throw new Error(`No language exists with the code '${code}'`);
    }

    languageForCode(code: LanguageCode): Language {
        let retLang: Language = null;

        for (let i = 0; i < Languages.length; i++) {
            const language = Languages[i];
            if (language.code === code) {
                retLang = language;
                break;
            }
        }

        if (!retLang) {
            throw new Error(`No language exists for the code '${code}'`);
        }

        return retLang;
    }

    languageForLocaleId(localeId: string): Language {
        const match = _.find(Languages, {code: localeId});
        return match ? match : _.find(Languages, {code: 'en'});
    }

    // A temporary method until https://github.com/angular/angular/issues/11405 is implemented
    i18n(key: string): string {
        return _.defaultTo(_.get(i18n, [key, this.languageForLocaleId(this.localeId).code].join('.')), key);
    }

}
