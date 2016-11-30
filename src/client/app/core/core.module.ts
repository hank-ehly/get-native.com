/**
 * core.module
 * get-native.com
 *
 * Created by henryehly on 2016/11/06.
 */

import { NgModule } from '@angular/core';

import { LocalStorageService, LoginService, StringService, PasswordStrengthService } from './index';

@NgModule({
    providers: [
        LocalStorageService,
        LoginService,
        PasswordStrengthService,
        StringService
    ]
})

export class CoreModule {
}
