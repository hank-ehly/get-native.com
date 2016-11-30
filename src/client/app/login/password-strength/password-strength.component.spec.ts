/**
 * password-strength.component.spec
 * get-native.com
 *
 * Created by henryehly on 2016/11/27.
 */

import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { PasswordStrengthComponent } from './password-strength.component';
import { SpecUtil, STUBLogger, STUBPasswords, StringService, PasswordService } from '../../core/index';

import { Logger } from 'angular2-logger/core';

export function main() {
    let comp: PasswordStrengthComponent;
    let fixture: ComponentFixture<PasswordStrengthComponent>;
    let el: HTMLElement;
    let util: SpecUtil;

    describe('PasswordStrengthComponent', () => {
        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [PasswordStrengthComponent],
                providers: [
                    StringService,
                    PasswordService,
                    {provide: Logger, useValue: STUBLogger}
                ]
            }).compileComponents().then(() => {
                fixture = TestBed.createComponent(PasswordStrengthComponent);
                util = new SpecUtil(fixture);
                comp = fixture.componentInstance;
                fixture.detectChanges();
            });
        }));

        it('should display a VERY WEAK state color', () => {
            comp.update(STUBPasswords.veryWeak);
            fixture.detectChanges();
            el = util.getNativeEl('.v-weak');
            expect(el.className).toContain('visible');
        });
        it('should display a VERY WEAK state label', () => {
            comp.update(STUBPasswords.veryWeak);
            fixture.detectChanges();
            el = util.getNativeEl('.right-aligned-text');
            expect(el.textContent).toEqual('VERY WEAK');
        });


        it('should display a WEAK state color', () => {
            comp.update(STUBPasswords.weak);
            fixture.detectChanges();
            el = util.getNativeEl('.weak');
            expect(el.className).toContain('visible');
        });
        it('should display a WEAK state label', () => {
            comp.update(STUBPasswords.weak);
            fixture.detectChanges();
            el = util.getNativeEl('.right-aligned-text');
            expect(el.textContent).toEqual('WEAK');
        });

        it('should display a GOOD state color', () => {
            comp.update(STUBPasswords.good);
            fixture.detectChanges();
            el = util.getNativeEl('.good');
            expect(el.className).toContain('visible');
        });
        it('should display a GOOD state label', () => {
            comp.update(STUBPasswords.good);
            fixture.detectChanges();
            el = util.getNativeEl('.right-aligned-text');
            expect(el.textContent).toEqual('GOOD');
        });

        it('should display a STRONG state color', () => {
            comp.update(STUBPasswords.strong);
            fixture.detectChanges();
            el = util.getNativeEl('.strong');
            expect(el.className).toContain('visible');
        });
        it('should display a STRONG state label', () => {
            comp.update(STUBPasswords.strong);
            fixture.detectChanges();
            el = util.getNativeEl('.right-aligned-text');
            expect(el.textContent).toEqual('STRONG');
        });

        it('should display a VERY STRONG state color', () => {
            comp.update(STUBPasswords.veryStrong);
            fixture.detectChanges();
            el = util.getNativeEl('.v-strong');
            expect(el.className).toContain('visible');
        });
        it('should display a VERY STRONG state label', () => {
            comp.update(STUBPasswords.veryStrong);
            fixture.detectChanges();
            el = util.getNativeEl('.right-aligned-text');
            expect(el.textContent).toEqual('VERY STRONG');
        });
    });
}
