/**
 * login.module
 * getnative.org
 *
 * Created by henryehly on 2016/11/23.
 */

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login.component';
import { SocialLoginComponent } from './social-login/social-login.component';
import { EmailLoginComponent } from './email-login/email-login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginModalService } from './login-modal.service';

@NgModule({
    imports: [SharedModule, FormsModule],
    declarations: [LoginComponent, SocialLoginComponent, EmailLoginComponent, RegisterComponent, ForgotPasswordComponent],
    exports: [LoginComponent],
    providers: [LoginModalService]
})
export class LoginModule {
}
