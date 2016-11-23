/**
 * password-strength.component
 * get-native.com
 *
 * Created by henryehly on 2016/11/23.
 */

import { Component } from '@angular/core';

import { Logger } from 'angular2-logger/core';

import { PasswordStrengthService } from './password-strength.service';

@Component({
    moduleId: module.id,
    selector: 'gn-password-strength',
    templateUrl: 'password-strength.component.html',
    styleUrls: ['password-strength.component.css']
})

export class PasswordStrengthComponent {
    strength: number = 0;

    constructor(private passwordStrengthService: PasswordStrengthService, private logger: Logger) {
    }

    showStrengthForPassword(password: string) {
        this.strength = this.passwordStrengthService.calculateStrength(password);
    }

    strengthDescription(): string {
        let matrix = [
            [0.0, 0.2, 'TOO SHORT'],
            [0.3, 0.4, 'WEAK'],
            [0.5, 0.7, 'GOOD'],
            [0.8, 1.0, 'EXCELLENT']
        ];

        for (const row in matrix) {
            let min = matrix[row][0];
            let max = matrix[row][1];
            let txt = matrix[row][2];

            if (this.strength >= min && this.strength <= max) {
                return txt.toString();
            }
        }
    }
}
