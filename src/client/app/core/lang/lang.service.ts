/**
 * lang.service
 * get-native.com
 *
 * Created by henryehly on 2016/12/29.
 */

import { Injectable } from '@angular/core';

import { LangCodes } from './lang-codes';
import { LangCode } from '../typings/lang-code';

@Injectable()
export class LangService {
    codeToName(code: LangCode): string {
        return <string>LangCodes[code];
    }
}
