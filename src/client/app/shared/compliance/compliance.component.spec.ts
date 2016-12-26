/**
 * compliance.component.spec
 * get-native.com
 *
 * Created by henryehly on 2016/11/11.
 */

import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';

import { ComplianceComponent } from './index';
import { LocalStorageService, STUBLocalStorageService } from '../../core/local-storage/index';
import { SpecUtil, STUBLogger, kAcceptLocalStorage, Logger } from '../../core/index';

export function main() {
    let comp: ComplianceComponent;
    let fixture: ComponentFixture<ComplianceComponent>;
    let el: HTMLElement;
    let util: SpecUtil;

    describe('ComplianceComponent', () => {
        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RouterModule.forRoot([])],
                declarations: [ComplianceComponent],
                providers: [
                    {provide: Logger, useValue: STUBLogger},
                    {provide: APP_BASE_HREF, useValue: '<%= APP_BASE %>'},
                    {provide: LocalStorageService, useValue: STUBLocalStorageService}
                ]
            }).compileComponents().then(() => {
                fixture = TestBed.createComponent(ComplianceComponent);
                util = new SpecUtil(fixture);
                comp = fixture.componentInstance;
                comp.isVisible = true;
                fixture.detectChanges();
            });
        }));

        it('should display a detail message', () => {
            el = util.getNativeEl('.dialog__paragraph');
            expect(el.textContent.length).toBeGreaterThan(0);
        });

        it('should display a link to TOS', () => {
            el = util.getNativeEl('.dialog__link_tos');
            expect(el.textContent.length).toBeGreaterThan(0);
        });

        it('should display a close button', () => {
            el = util.getNativeEl('.dialog__link_close');
            expect(el.textContent.length).toBeGreaterThan(0);
        });

        it('should become compliant after receiving notification', () => {
            expect(comp.isVisible).toEqual(true);
            comp.didSetLocalStorageItem({key: kAcceptLocalStorage, data: true});
            expect(comp.isVisible).toEqual(false);
        });
    });
}
