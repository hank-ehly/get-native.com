/**
 * login.module
 * get-native.com
 *
 * Created by henryehly on 2016/11/23.
 */

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import {
    LoginComponent,
    SocialLoginComponent,
    RegisterComponent,
    EmailLoginComponent
} from './index';

@NgModule({
    imports: [
        SharedModule,
        FormsModule
    ],
    declarations: [
        LoginComponent,
        SocialLoginComponent,
        EmailLoginComponent,
        RegisterComponent
    ],
    exports: [
        LoginComponent
    ]
})

export class LoginModule {
}
