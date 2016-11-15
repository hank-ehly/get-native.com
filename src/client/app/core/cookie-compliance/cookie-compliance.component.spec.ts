/**
 * cookie-compliance.component.spec
 * get-native.com
 *
 * Created by henryehly on 2016/11/11.
 */

import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { CookieComplianceComponent } from './cookie-compliance.component';
import { Logger } from 'angular2-logger/core';

let loggerStub = {
    debug: () => {
    }
};

export function main() {
    let comp: CookieComplianceComponent;
    let fixture: ComponentFixture<CookieComplianceComponent>;
    let el: HTMLElement;

    function getNativeElement(selector) {
        return fixture.debugElement.query(By.css(selector)).nativeElement;
    }

    describe('CookieComplianceComponent', () => {
        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [CookieComplianceComponent],
                providers: [{provide: Logger, useValue: loggerStub}]
            }).compileComponents().then(() => {
                fixture = TestBed.createComponent(CookieComplianceComponent);
                fixture.detectChanges();
                comp = fixture.componentInstance;
            });
        }));

        it('should by default be non-compliant and thus visible', () => {
            el = getNativeElement('.cookie-compliance-dialog');
            expect(el).toBeTruthy();
        });

        it('should say that this site uses cookies', () => {
            el = getNativeElement('.compliance-detail');
            expect(el.textContent).toContain('This site uses cookies.');
        });

        it('should have a link to the TOS page', () => {
            el = getNativeElement('.tos-link');
            expect(el.textContent).toContain('Find out more here');
        });

        it('should have a close button', () => {
            el = getNativeElement('.comply-trigger');
            expect(el.textContent).toEqual('Close');
        });
    });
}
