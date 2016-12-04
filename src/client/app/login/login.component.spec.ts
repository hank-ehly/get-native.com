/**
 * login.component.spec
 * get-native.com
 *
 * Created by henryehly on 2016/11/13.
 */

import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import {
    LoginComponent,
    SocialLoginComponent,
    EmailLoginComponent,
    RegisterComponent,
    PasswordStrengthComponent
} from './index';
import {
    SpecUtil,
    STUBLogger,
    STUBLoginService,
    STUBPasswordService,
    PasswordService,
    LoginService
} from '../core/index';

import { Logger } from 'angular2-logger/core';

export function main() {
    let comp: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let de: DebugElement;
    let el: HTMLElement;
    let util: SpecUtil;

    describe('LoginComponent', () => {
        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FormsModule],
                declarations: [
                    LoginComponent,
                    SocialLoginComponent,
                    EmailLoginComponent,
                    RegisterComponent,
                    PasswordStrengthComponent
                ],
                providers: [
                    {provide: Logger, useValue: STUBLogger},
                    {provide: LoginService, useValue: STUBLoginService},
                    {provide: PasswordService, useValue: STUBPasswordService}
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
            el = util.getNativeEl('.modal section');
            expect(el.childElementCount).toEqual(3);
        });

        it('should have a footer with 2 links', () => {
            el = util.getNativeEl('.modal footer');
            expect(el.childElementCount).toEqual(2);
            expect(el.children[0].className).toContain('footer-link');
            expect(el.children[1].className).toContain('footer-link');
        });
    });
}
