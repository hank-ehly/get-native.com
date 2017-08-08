/**
 * login.component.spec
 * getnativelearning.com
 *
 * Created by henryehly on 2016/11/13.
 */

import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login.component';
import { SpecUtil } from '../core/spec/spec-util';
import { SocialLoginComponent } from './social-login/social-login.component';
import { EmailLoginComponent } from './email-login/email-login.component';
import { RegisterComponent } from './register/register.component';
import { Logger } from '../core/logger/logger';
import { STUBLogger } from '../core/logger/logger.stub';
import { LoginModalService } from '../core/login-modal/login-modal.service';
import { STUBLoginModalService } from '../core/login-modal/login-modal.service.stub';
import { PasswordService } from '../core/password/password.service';
import { STUBPasswordService } from '../core/password/password.service.stub';
import { STUBRouter } from '../core/spec/stubs';
import { NavbarService } from '../core/navbar/navbar.service';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

describe('LoginComponent', () => {
    let comp: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let el: HTMLElement;
    let util: SpecUtil;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SharedModule, FormsModule, BrowserAnimationsModule],
            declarations: [
                LoginComponent,
                SocialLoginComponent,
                EmailLoginComponent,
                RegisterComponent,
                ForgotPasswordComponent
            ],
            providers: [
                {provide: Logger, useValue: STUBLogger},
                {provide: LoginModalService, useValue: STUBLoginModalService},
                {provide: PasswordService, useValue: STUBPasswordService},
                {provide: Router, useValue: STUBRouter},
                NavbarService
            ]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(LoginComponent);
            util = new SpecUtil(fixture);
            comp = fixture.componentInstance;
            fixture.detectChanges();
        });
    }));

    it('should have 3 social-login buttons', () => {
        el = util.getNativeEl('.modal__body');
        return expect(el.childElementCount).toEqual(3);
    });

    it('should have a footer with 2 links', () => {
        el = util.getNativeEl('.footer');
        return expect(el.childElementCount).toEqual(2);
    });
});
