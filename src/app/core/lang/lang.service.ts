/**
 * lang.service
 * get-native.com
 *
 * Created by henryehly on 2016/12/29.
 */

import { Injectable } from '@angular/core';

import { LanguageCode } from '../typings/language-code';
import { Language } from '../typings/language';
import { Languages } from './languages';

import * as _ from 'lodash';

@Injectable()
export class LangService {

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
        return !match ? _.find(Languages, {code: 'en'}) : match;
    }
}
