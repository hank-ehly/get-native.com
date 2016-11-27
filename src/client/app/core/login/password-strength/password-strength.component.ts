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
    score: number = 0;

    constructor(private passwordStrengthService: PasswordStrengthService, private logger: Logger) {}

    get strengthLabel(): string {
        let matrix: [number, string][] = [
            [0, 'VERY WEAK'],
            [20, 'WEAK'],
            [40, 'GOOD'],
            [60, 'STRONG'],
            [80, 'VERY STRONG']
        ];

        var desc: string = matrix[0][1];

        for (const row in matrix) {
            let min = matrix[row][0];
            let txt = matrix[row][1];
            if (this.score >= min) desc = txt;
        }

        return desc;
    }

    update(password: string) {
        this.score = this.passwordStrengthService.calculateStrength(password);
    }
}
