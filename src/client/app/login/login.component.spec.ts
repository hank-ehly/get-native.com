/**
 * login.component.spec
 * get-native.com
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


export function main() {
    let comp: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let de: DebugElement;
    let el: HTMLElement;
    let util: SpecUtil;

    describe('LoginComponent', () => {
        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SharedModule, FormsModule, BrowserAnimationsModule],
                declarations: [
                    LoginComponent,
                    SocialLoginComponent,
                    EmailLoginComponent,
                    RegisterComponent
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
                comp.isVisible = true;
                fixture.detectChanges();
            });
        }));

        it('should display an overlay when visible', () => {
            el = util.getNativeEl('.overlay');
            expect(el).toBeTruthy();
            expect(comp.isVisible).toEqual(true);
        });

        it('should become hidden after clicking the overlay', () => {
            el = util.getNativeEl('.overlay');
            de = util.getDebugEl('.overlay');
            de.triggerEventHandler('click', {target: {className: el.className}});
            expect(comp.isVisible).toEqual(false);
        });

        it('should become hidden after clicking the close button', () => {
            el = util.getNativeEl('.modal-frame__close-button');
            de = util.getDebugEl('.modal-frame__close-button');
            de.triggerEventHandler('click', {target: {className: el.className}});
            expect(comp.isVisible).toEqual(false);
        });

        it('should have 3 social-login buttons', () => {
            el = util.getNativeEl('.modal__body');
            expect(el.childElementCount).toEqual(3);
        });

        it('should have a footer with 2 links', () => {
            el = util.getNativeEl('.footer');
            expect(el.childElementCount).toEqual(2);
            expect(el.children[0].className).toContain('footer__link');
            expect(el.children[1].className).toContain('footer__link');
        });
    });
}
