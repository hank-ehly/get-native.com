/**
 * password-strength.component
 * get-native.com
 *
 * Created by henryehly on 2016/11/23.
 */

import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { PasswordService } from '../../core/password/password.service';

@Component({

    selector: 'gn-password-strength',
    templateUrl: 'password-strength.component.html',
    styleUrls: ['password-strength.component.css']
})
export class PasswordStrengthComponent implements OnChanges {
    @Input() password: string;
    score: number = 0;

    matrix: [number, string][] = [
        [0, 'VERY WEAK'],
        [20, 'WEAK'],
        [40, 'GOOD'],
        [60, 'STRONG'],
        [80, 'VERY STRONG']
    ];

    private _strengthLabel: string;

    constructor(private passwordService: PasswordService) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (!changes['password']) return;

        this.score = this.passwordService.calculateStrength(changes['password'].currentValue);
    }

    get strengthLabel(): string {
        this._strengthLabel = this.matrix[0][1];

        for (const row in this.matrix) {
            let min = this.matrix[row][0];
            let txt = this.matrix[row][1];
            if (this.score >= min) this._strengthLabel = txt;
        }

        return this._strengthLabel;
    }
}
