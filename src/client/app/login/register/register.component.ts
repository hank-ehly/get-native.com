/**
 * register.component
 * get-native.com
 *
 * Created by henryehly on 2016/11/23.
 */

import { Component } from '@angular/core';

import { LoginModalService, Logger } from '../../core/index';

@Component({
    moduleId: module.id,
    selector: 'gn-register',
    templateUrl: 'register.component.html',
    styleUrls: ['register.component.css']
})
export class RegisterComponent {
    emailRegex = '[a-z0-9!#$%&\'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*';

    credentials: any = {
        email: '',
        password: '',
        passwordConfirm: ''
    };

    constructor(private logger: Logger, private loginModal: LoginModalService) {
    }

    onSetModalView(view: string) {
        this.loginModal.setActiveView(view);
    }

    onSubmit(): void {
        this.logger.debug('[RegisterComponent]: Submit');
    }
}
