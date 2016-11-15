/**
 * cookie-compliance.component.spec
 * get-native.com
 *
 * Created by henryehly on 2016/11/11.
 */

import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CookieComplianceComponent } from './cookie-compliance.component';
import { Logger } from 'angular2-logger/core';

let loggerStub = {
    debug: () => {
    }
};

export function main() {
    let comp: CookieComplianceComponent;
    let fixture: ComponentFixture<CookieComplianceComponent>;
    let de: DebugElement;
    let el: HTMLElement;

    function getDebugEl(selector: string): DebugElement {
        return fixture.debugElement.query(By.css(selector));
    }

    function getNativeEl(selector: string): HTMLElement {
        return getDebugEl(selector).nativeElement;
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

        it('should display a detail message', () => {
            el = getNativeEl('.compliance-detail');
            expect(el.textContent.length).toBeGreaterThan(0);
        });

        it('should display a link to TOS', () => {
            el = getNativeEl('.tos-link');
            expect(el.textContent.length).toBeGreaterThan(0);
        });

        it('should display a close button', () => {
            el = getNativeEl('.comply-trigger');
            expect(el.textContent.length).toBeGreaterThan(0);
        });

        it('should become compliant after clicking close button', () => {
            de = getDebugEl('.comply-trigger');
            expect(comp.isCompliant).toEqual(false);

            /* Note: (click) and such are triggered this way.
             * If the handler requires the $event object, pass
             * one as the 2nd object */
            de.triggerEventHandler('click', null);
            expect(comp.isCompliant).toEqual(true);
        });
    });
}
