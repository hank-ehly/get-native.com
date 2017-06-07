/**
 * password-strength.component.spec
 * get-native.com
 *
 * Created by henryehly on 2016/11/27.
 */

import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { PasswordStrengthComponent } from './password-strength.component';
import { SpecUtil } from '../../core/spec/spec-util';
import { StringService } from '../../core/string/string.service';
import { PasswordService } from '../../core/password/password.service';
import { Logger } from '../../core/logger/logger';
import { STUBLogger } from '../../core/logger/logger.stub';
import { STUBPasswords } from '../../core/spec/stubs';

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
            comp.password = STUBPasswords.veryWeak;
            fixture.detectChanges();
            el = util.getNativeEl('.meter__segment--very-weak');
            expect(el.className).toContain('meter__segment--visible');
        });
        it('should display a VERY WEAK state label', () => {
            comp.password = STUBPasswords.veryWeak;
            fixture.detectChanges();
            el = util.getNativeEl('.meter__description');
            expect(el.textContent).toEqual('VERY WEAK');
        });


        // Behavior of tests differs from normal.
        // https://github.com/angular/angular/issues/9866
        //
        // it('should display a WEAK state color', () => {
        //     comp.password = STUBPasswords.weak;
        //     fixture.detectChanges();
        //     el = util.getNativeEl('.meter__segment--weak');
        //     expect(el.className).toContain('meter__segment--visible');
        // });
        // it('should display a WEAK state label', () => {
        //     comp.password = STUBPasswords.weak;
        //     fixture.detectChanges();
        //     el = util.getNativeEl('.meter__description');
        //     expect(el.textContent).toEqual('WEAK');
        // });
        //
        // it('should display a GOOD state color', () => {
        //     comp.password = STUBPasswords.good;
        //     fixture.detectChanges();
        //     el = util.getNativeEl('.meter__segment--good');
        //     expect(el.className).toContain('meter__segment--visible');
        // });
        // it('should display a GOOD state label', () => {
        //     comp.password = STUBPasswords.good;
        //     fixture.detectChanges();
        //     el = util.getNativeEl('.meter__description');
        //     expect(el.textContent).toEqual('GOOD');
        // });
        //
        // it('should display a STRONG state color', () => {
        //     comp.password = STUBPasswords.strong;
        //     fixture.detectChanges();
        //     el = util.getNativeEl('.meter__segment--strong');
        //     expect(el.className).toContain('meter__segment--visible');
        // });
        // it('should display a STRONG state label', () => {
        //     comp.password = STUBPasswords.strong;
        //     fixture.detectChanges();
        //     el = util.getNativeEl('.meter__description');
        //     expect(el.textContent).toEqual('STRONG');
        // });
        //
        // it('should display a VERY STRONG state color', () => {
        //     comp.password = STUBPasswords.veryStrong;
        //     fixture.detectChanges();
        //     el = util.getNativeEl('.meter__segment--very-strong');
        //     expect(el.className).toContain('meter__segment--visible');
        // });
        // it('should display a VERY STRONG state label', () => {
        //     comp.password = STUBPasswords.veryStrong;
        //     fixture.detectChanges();
        //     el = util.getNativeEl('.meter__description');
        //     expect(el.textContent).toEqual('VERY STRONG');
        // });
    });
}
