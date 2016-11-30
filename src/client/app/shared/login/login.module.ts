/**
 * login.module
 * get-native.com
 *
 * Created by henryehly on 2016/11/23.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
    LoginComponent,
    SocialLoginComponent,
    RegisterComponent,
    EmailLoginComponent,
    PasswordStrengthComponent
} from './index';

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [LoginComponent, SocialLoginComponent, EmailLoginComponent, RegisterComponent, PasswordStrengthComponent],
    exports: [LoginComponent, SocialLoginComponent, EmailLoginComponent, RegisterComponent, PasswordStrengthComponent]
})

export class LoginModule {
}
