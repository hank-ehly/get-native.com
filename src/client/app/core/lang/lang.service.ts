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

@Injectable()
export class LangService {

    codeToName(code: LanguageCode): string {
        for (let lang of Languages) {
            if (lang.code === code) {
                return lang.name;
            }
        }

        throw new Error(`No language exists with the code '${code}'`);
    }

    languageForCode(code: LanguageCode): Language {
        let retLang: Language = null;

        for (let i = 0; i < Languages.length; i++) {
            let language = Languages[i];
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
}
