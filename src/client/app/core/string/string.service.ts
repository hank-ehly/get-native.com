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

    containsAlphaLC(char: string) {
        return /[a-z]/g.test(char);
    }

    containsAlphaUC(char: string) {
        return /[A-Z]/g.test(char);
    }

    reverse(str: string): string {
        let reversed: string = '';
        for (let i = 0; i < str.length; i++) {
            reversed = str.charAt(i) + reversed;
        }
        return reversed;
    };
}
