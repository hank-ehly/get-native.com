/**
 * password-strength.component
 * get-native.com
 *
 * Created by henryehly on 2016/11/23.
 */

import { Component } from '@angular/core';

import { PasswordService } from '../../core/index';

import { Logger } from 'angular2-logger/core';

@Component({
    moduleId: module.id,
    selector: 'gn-password-strength',
    templateUrl: 'password-strength.component.html',
    styleUrls: ['password-strength.component.css']
})

export class PasswordStrengthComponent {
    score: number = 0;
    private _strengthLabel: string;

    constructor(private passwordService: PasswordService, private logger: Logger) {}

    get strengthLabel(): string {
        let matrix: [number, string][] = [
            [0, 'VERY WEAK'],
            [20, 'WEAK'],
            [40, 'GOOD'],
            [60, 'STRONG'],
            [80, 'VERY STRONG']
        ];

        this._strengthLabel = matrix[0][1];

        for (const row in matrix) {
            let min = matrix[row][0];
            let txt = matrix[row][1];
            if (this.score >= min) this._strengthLabel = txt;
        }

        return this._strengthLabel;
    }

    update(password: string) {
        this.score = this.passwordService.calculateStrength(password);
    }
}
