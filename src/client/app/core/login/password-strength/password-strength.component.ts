/**
 * password-strength.component
 * get-native.com
 *
 * Created by henryehly on 2016/11/23.
 */

import { Component, Input } from '@angular/core';

import { PasswordStrengthService } from './password-strength.service';

@Component({
    moduleId: module.id,
    selector: 'gn-password-strength',
    templateUrl: 'password-strength.component.html',
    styleUrls: ['password-strength.component.css']
})

export class PasswordStrengthComponent {
    showWeak: boolean = false;
    showGood: boolean = false;
    showExcellent: boolean = false;
    strengthLabelText: string = 'TOO SHORT';

    constructor(private passwordStrengthService: PasswordStrengthService) {
    }

    setStrengthForPassword(password: string) {
        let strength = this.passwordStrengthService.calculateStrength(password);

        if (strength < 0.3)                    { this.reset();        }
        if (strength >= 0.3 && strength < 0.5) { this.setWeak();      }
        if (strength >= 0.5 && strength < 0.8) { this.setGood();      }
        if (strength >= 0.8)                   { this.setExcellent(); }
    }

    private reset(): void {
        this.showWeak = false;
        this.showGood = false;
        this.showExcellent = false;
        this.strengthLabelText = 'TOO SHORT';
    }

    private setWeak(): void {
        this.showWeak = true;
        this.showGood = false;
        this.showExcellent = false;
        this.strengthLabelText = 'WEAK';
    }

    private setGood(): void {
        this.showWeak = true;
        this.showGood = true;
        this.showExcellent = false;
        this.strengthLabelText = 'GOOD';
    }

    private setExcellent(): void {
        this.showWeak = true;
        this.showGood = true;
        this.showExcellent = true;
        this.strengthLabelText = 'EXCELLENT';
    }
}
