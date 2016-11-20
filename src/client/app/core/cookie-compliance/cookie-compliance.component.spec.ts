/**
 * cookie-compliance.component.spec
 * get-native.com
 *
 * Created by henryehly on 2016/11/11.
 */

import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';

import { CookieComplianceComponent } from './index';
import { SpecUtil } from '../../shared/index';
import { LocalStorageService } from '../index';

import { Logger } from 'angular2-logger/core';
import { kAcceptLocalStorage } from '../local-storage/local-storage-keys';
// import { Observable } from 'rxjs/Observable';

/* TODO: Move to 'STUBS' file */
let loggerStub = {
    debug(): void {
    }
};

/* TODO: Move to 'STUBS' file */
let localStorageServiceStub = {
    setItem(key: string, data: any): void {
    },
    setItem$: {
        subscribe(): void {
        }
    },
    storageEvent$: {
        subscribe(): void {
        }
    },
    clearSource$: {
        subscribe(): void {
        }
    }
};

export function main() {
    let comp: CookieComplianceComponent;
    let fixture: ComponentFixture<CookieComplianceComponent>;
    let de: DebugElement;
    let el: HTMLElement;
    let util: SpecUtil;

    describe('CookieComplianceComponent', () => {
        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RouterModule.forRoot([])],
                declarations: [CookieComplianceComponent],
                providers: [
                    {provide: Logger, useValue: loggerStub},
                    {provide: APP_BASE_HREF, useValue: '<%= APP_BASE %>'},
                    {provide: LocalStorageService, useValue: localStorageServiceStub}
                ]
            }).compileComponents().then(() => {
                fixture = TestBed.createComponent(CookieComplianceComponent);
                util = new SpecUtil(fixture);
                comp = fixture.componentInstance;
                comp.isVisible = true;
                fixture.detectChanges();
            });
        }));

        it('should display a detail message', () => {
            el = util.getNativeEl('.compliance-detail');
            expect(el.textContent.length).toBeGreaterThan(0);
        });

        it('should display a link to TOS', () => {
            el = util.getNativeEl('.tos-link');
            expect(el.textContent.length).toBeGreaterThan(0);
        });

        it('should display a close button', () => {
            el = util.getNativeEl('.comply-trigger');
            expect(el.textContent.length).toBeGreaterThan(0);
        });

        it('should become compliant after receiving notification', () => {
            de = util.getDebugEl('.comply-trigger');
            expect(comp.isVisible).toEqual(true);
            comp.didSetLocalStorageItem({key: kAcceptLocalStorage, data: true});
            expect(comp.isVisible).toEqual(false);
        });
    });
}
