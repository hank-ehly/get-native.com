/**
 * password-strength.component.spec
 * getnative.org
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

describe('PasswordStrengthComponent', () => {
    let comp: PasswordStrengthComponent;
    let fixture: ComponentFixture<PasswordStrengthComponent>;
    let el: HTMLElement;
    let util: SpecUtil;

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
});
