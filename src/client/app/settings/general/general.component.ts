/**
 * general.component
 * get-native.com
 *
 * Created by henryehly on 2016/12/09.
 */

import { Component } from '@angular/core';

import { Logger, HttpService, APIHandle } from '../../core/index';

@Component({
    moduleId: module.id,
    selector: 'gn-general',
    templateUrl: 'general.component.html',
    styleUrls: ['general.component.css']
})
export class GeneralComponent {
    isEditing: boolean = false;

    passwordForm: any = {
        current: '',
        replace: '',
        confirm: ''
    };

    constructor(private logger: Logger, private http: HttpService) {
    }

    onToggleEditing(): void {
        this.isEditing = !this.isEditing;
    }

    onSubmitPassword(): void {
        this.logger.debug(`[${this.constructor.name}] onSubmitPassword()`);

        this.http.request(APIHandle.EDIT_PASSWORD, {body: {password: this.passwordForm.replace}}).subscribe();
    }
}
