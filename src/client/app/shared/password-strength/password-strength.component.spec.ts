/**
 * password-strength.component.spec
 * get-native.com
 *
 * Created by henryehly on 2016/11/27.
 */

import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { PasswordStrengthComponent } from './password-strength.component';
import { SpecUtil, STUBLogger, STUBPasswords, StringService, PasswordService, Logger } from '../../core/index';

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
            el = util.getNativeEl('.meter__segment--very-weak');
            expect(el.className).toContain('meter__segment--visible');
        });
        it('should display a VERY WEAK state label', () => {
            comp.update(STUBPasswords.veryWeak);
            fixture.detectChanges();
            el = util.getNativeEl('.meter__description');
            expect(el.textContent).toEqual('VERY WEAK');
        });


        it('should display a WEAK state color', () => {
            comp.update(STUBPasswords.weak);
            fixture.detectChanges();
            el = util.getNativeEl('.meter__segment--weak');
            expect(el.className).toContain('meter__segment--visible');
        });
        it('should display a WEAK state label', () => {
            comp.update(STUBPasswords.weak);
            fixture.detectChanges();
            el = util.getNativeEl('.meter__description');
            expect(el.textContent).toEqual('WEAK');
        });

        it('should display a GOOD state color', () => {
            comp.update(STUBPasswords.good);
            fixture.detectChanges();
            el = util.getNativeEl('.meter__segment--good');
            expect(el.className).toContain('meter__segment--visible');
        });
        it('should display a GOOD state label', () => {
            comp.update(STUBPasswords.good);
            fixture.detectChanges();
            el = util.getNativeEl('.meter__description');
            expect(el.textContent).toEqual('GOOD');
        });

        it('should display a STRONG state color', () => {
            comp.update(STUBPasswords.strong);
            fixture.detectChanges();
            el = util.getNativeEl('.meter__segment--strong');
            expect(el.className).toContain('meter__segment--visible');
        });
        it('should display a STRONG state label', () => {
            comp.update(STUBPasswords.strong);
            fixture.detectChanges();
            el = util.getNativeEl('.meter__description');
            expect(el.textContent).toEqual('STRONG');
        });

        it('should display a VERY STRONG state color', () => {
            comp.update(STUBPasswords.veryStrong);
            fixture.detectChanges();
            el = util.getNativeEl('.meter__segment--very-strong');
            expect(el.className).toContain('meter__segment--visible');
        });
        it('should display a VERY STRONG state label', () => {
            comp.update(STUBPasswords.veryStrong);
            fixture.detectChanges();
            el = util.getNativeEl('.meter__description');
            expect(el.textContent).toEqual('VERY STRONG');
        });
    });
}
