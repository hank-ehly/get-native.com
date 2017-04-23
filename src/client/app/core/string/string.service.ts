/**
 * string.service
 * get-native.com
 *
 * Created by henryehly on 2016/11/27.
 */

import { Injectable } from '@angular/core';

@Injectable()
export class StringService {
    containsSymbol(char: string): boolean {
        return /[^a-zA-Z0-9_]/g.test(char);
    }

    containsNumeric(char: string): boolean {
        return /[0-9]/g.test(char);
    }

    containsAlphaLC(char: string): boolean {
        return /[a-z]/g.test(char);
    }

    containsAlphaUC(char: string): boolean {
        return /[A-Z]/g.test(char);
    }
}
