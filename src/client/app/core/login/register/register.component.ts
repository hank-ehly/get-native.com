/**
 * register.component
 * get-native.com
 *
 * Created by henryehly on 2016/11/23.
 */

import { Component, EventEmitter, Output, ViewChild, AfterViewChecked } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Logger } from 'angular2-logger/core';

@Component({
    moduleId: module.id,
    selector: 'gn-register',
    templateUrl: 'register.component.html',
    styleUrls: ['register.component.css']
})

export class RegisterComponent implements AfterViewChecked {
    @Output() setModalView = new EventEmitter<string>();
    @ViewChild('form') currentForm: NgForm;
    formRef: NgForm;
    passwordStrength: string;
    passwordStrengthNumber: number;

    meetsWeakRequirements: boolean = false;
    meetsGoodRequirements: boolean = false;
    meetsExcellentRequirements: boolean = false;

    credentials = {
        email: '',
        password: '',
        passwordConfirm: ''
    };

    formErrors = {
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
            this.calculatePasswordStrength(data['password']);
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

    calculatePasswordStrength(password: string): void {
        if (password.length === 0) return;

        if (password.length >= 8) {
            this.meetsWeakRequirements = true;
            this.meetsGoodRequirements = true;
            this.meetsExcellentRequirements = true;
            this.passwordStrength = 'EXCELLENT';
        } else if (password.length >= 5) {
            this.meetsWeakRequirements = true;
            this.meetsGoodRequirements = true;
            this.meetsExcellentRequirements = false;
            this.passwordStrength = 'GOOD';
        } else if (password.length >= 2) {
            this.meetsWeakRequirements = true;
            this.meetsGoodRequirements = false;
            this.meetsExcellentRequirements = false;
            this.passwordStrength = 'WEAK';
        } else {
            this.meetsWeakRequirements = false;
            this.meetsGoodRequirements = false;
            this.meetsExcellentRequirements = false;
            this.passwordStrength = 'TOO SHORT';
        }
    }
}
