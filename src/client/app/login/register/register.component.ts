/**
 * register.component
 * get-native.com
 *
 * Created by henryehly on 2016/11/23.
 */

import { Component, ViewChild, AfterViewChecked } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Logger } from 'angular2-logger/core';

import { PasswordStrengthComponent } from '../password-strength/password-strength.component';
import { LoginService } from '../../core/index';

@Component({
    moduleId: module.id,
    selector: 'gn-register',
    templateUrl: 'register.component.html',
    styleUrls: ['register.component.css']
})

export class RegisterComponent implements AfterViewChecked {
    @ViewChild('form') currentForm: NgForm;
    @ViewChild(PasswordStrengthComponent) passwordStrengthComponent: PasswordStrengthComponent;
    formRef: NgForm;

    /* Taken from HTML5 Specification */
    HTML5_EMAIL_REGEX: string = '[a-z0-9!#$%&\'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*';

    credentials: any = {
        email: '',
        password: '',
        passwordConfirm: ''
    };

    formErrors: string[] = [];

    constructor(private logger: Logger, private loginService: LoginService) {
    }

    ngAfterViewChecked(): void {
        this.formChanged();
    }

    formChanged() {
        if (this.currentForm === this.formRef) return;

        this.formRef = this.currentForm;
        if (this.formRef) {
            this.formRef.valueChanges.subscribe(data => this.onValueChanged(data));
        }
    }

    onSetModalView(view: string) {
        this.loginService.setActiveView(view);
    }

    onSubmit(): void {
        this.logger.debug('[RegisterComponent]: Submit');

        // TODO: Attempt registration
        // TODO: Display callback error if present
        // TODO: Model callback error object (see if you can subclass some angular error object)
        // TODO: Transition to dashboard view on successful login
        setTimeout(() => {
            this.logger.debug('[RegisterComponent]: Received (mock) response.');
            let mockErrorsObject = [{message: 'This email is already in use', code: 123}];
            for (let err in mockErrorsObject) {
                let msg = mockErrorsObject[err]['message'];
                if (this.formErrors.indexOf(msg) === -1) {
                    this.formErrors.push(msg);
                }
            }
        }, 1000);
    }

    onValueChanged(data?: any) {
        if (!this.formRef) return;

        this.logger.debug('Value Change', data);

        if (data.hasOwnProperty('password')) {
            this.passwordStrengthComponent.update(data.password);
        }
    }
}
