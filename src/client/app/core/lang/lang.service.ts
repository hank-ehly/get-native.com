/**
 * lang.service
 * get-native.com
 *
 * Created by henryehly on 2016/12/29.
 */

import { Injectable } from '@angular/core';

import { Languages } from './languages';
import { LangCode } from '../typings/lang-code';

@Injectable()
export class LangService {
    codeToName(code: LangCode): string {
        for (let lang of Languages) {
            if (lang.code === code) {
                return lang.name;
            }
        }

        throw new Error(`No language exists with the code '${code}'`);
    }
}
