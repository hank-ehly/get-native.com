/**
 * email-login.component
 * get-native.com
 *
 * Created by henryehly on 2016/11/23.
 */

import { Component, Output, EventEmitter } from '@angular/core';
import { Logger } from 'angular2-logger/core';

@Component({
    moduleId: module.id,
    selector: 'gn-email-login',
    templateUrl: 'email-login.component.html',
    styleUrls: ['email-login.component.css']
})

export class EmailLoginComponent {
    @Output() setModalView = new EventEmitter<string>();

    /* Taken from HTML5 Specification */
    HTML5_EMAIL_REGEX: string = '[a-z0-9!#$%&\'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*';

    credentials: any = {
        email: '',
        password: ''
    };

    formErrors: string[] = [];

    constructor(private logger: Logger) {
    }

    onSetModalView(view: string) {
        this.setModalView.emit(view);
    }

    // TODO: API
    // TODO: Success -> Go to dashboard
    // TODO: Failure -> Display form error
    onSubmit(): void {
        this.logger.debug('[EmailLoginComponent]: onSubmit()');
    }
}
