/**
 * password-strength.component
 * getnativelearning.com
 *
 * Created by henryehly on 2016/11/23.
 */

import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { PasswordService } from '../../core/password/password.service';

@Component({
    selector: 'gn-password-strength',
    templateUrl: 'password-strength.component.html',
    styleUrls: ['password-strength.component.scss']
})
export class PasswordStrengthComponent implements OnChanges {
    @Input() password: string;
    score = 0;

    constructor(private passwordService: PasswordService) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['password']) {
            this.score = this.passwordService.calculateStrength(changes['password'].currentValue);
        }
    }
}
