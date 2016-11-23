/**
 * password-strength.service
 * get-native.com
 *
 * Created by henryehly on 2016/11/23.
 */

import { Injectable } from '@angular/core';

@Injectable()

export class PasswordStrengthService {
    calculateStrength(password: string): number {
        if (password.length === 0) return 0;

        if (password.length >= 8) {
            return 0.8;
        } else if (password.length >= 5) {
            return 0.5;
        } else if (password.length >= 2) {
            return 0.3;
        } else {
            return 0;
        }
    }
}
