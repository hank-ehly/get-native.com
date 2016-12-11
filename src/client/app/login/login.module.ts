/**
 * login.module
 * get-native.com
 *
 * Created by henryehly on 2016/11/23.
 */

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
    LoginComponent,
    SocialLoginComponent,
    RegisterComponent,
    EmailLoginComponent,
    PasswordStrengthComponent
} from './index';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        SharedModule,
        FormsModule
    ],
    declarations: [
        LoginComponent,
        SocialLoginComponent,
        EmailLoginComponent,
        RegisterComponent,
        PasswordStrengthComponent
    ],
    exports: [
        LoginComponent
    ]
})

export class LoginModule {
}
