/**
 * register.component
 * get-native.com
 *
 * Created by henryehly on 2016/11/23.
 */

import { Component, EventEmitter, Output, ViewChild, AfterViewChecked } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Logger } from 'angular2-logger/core';

import { PasswordStrengthComponent } from '../password-strength/password-strength.component';

@Component({
    moduleId: module.id,
    selector: 'gn-register',
    templateUrl: 'register.component.html',
    styleUrls: ['register.component.css']
})

export class RegisterComponent implements AfterViewChecked {
    @Output() setModalView = new EventEmitter<string>();
    @ViewChild('form') currentForm: NgForm;
    @ViewChild(PasswordStrengthComponent) passwordStrengthComponent: PasswordStrengthComponent;
    formRef: NgForm;
    passwordStrength: string;

    meetsWeakRequirements: boolean = false;
    meetsGoodRequirements: boolean = false;
    meetsExcellentRequirements: boolean = false;

    credentials: any = {
        email: '',
        password: '',
        passwordConfirm: ''
    };

    formErrors: any = {
        'email': '',
        'password': '',
        'password-confirm': ''
    };

    // Example
    // validationMessages = {
    //     'name': {
    //         'required':      'Name is required.',
    //         'minlength':     'Name must be at least 4 characters long.',
    //         'maxlength':     'Name cannot be more than 24 characters long.',
    //         'forbiddenName': 'Someone named "Bob" cannot be a hero.'
    //     },
    //     'power': {
    //         'required': 'Power is required.'
    //     }
    // };

    constructor(private logger: Logger) {
        this.passwordStrength = 'TOO SHORT';
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
        this.setModalView.emit(view);
    }

    onSubmit(): void {
        this.logger.debug('Submit!');
    }

    onValueChanged(data?: any) {
        this.logger.debug('Value Change', data);

        if (data['password']) {
            this.passwordStrengthComponent.setStrengthForPassword(data['password']);
        }

        if (!this.formRef) return;
        const form = this.formRef.form;

        for (const field in this.formErrors) {
            /* Reset error messages if present */
            this.formErrors[field] = '';
            const control = form.get(field);

            // Example
            // if (control && control.dirty && !control.valid) {
            //     const messages = this.validationMessages[field];
            //     for (const key in control.errors) {
            //         this.formErrors[field] += messages[key] + ' ';
            //     }
            // }
        }
    }
}
