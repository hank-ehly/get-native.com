/**
 * login-modal.component.spec
 * get-native.com
 *
 * Created by henryehly on 2016/11/13.
 */

import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Subject } from 'rxjs/Subject';

import { LoginModalComponent, LoginModalService } from './index';
import { SpecUtil } from '../../shared/index';

import { Logger } from 'angular2-logger/core';

let stubLogger = {
    debug(message?: any): void {
    }
};

let stubLoginModalService = {
    showModal$: new Subject().asObservable()
};

export function main() {
    let comp: LoginModalComponent;
    let fixture: ComponentFixture<LoginModalComponent>;
    let de: DebugElement;
    let el: HTMLElement;
    let util: SpecUtil;

    describe('LoginModalComponent', () => {
        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [LoginModalComponent],
                providers: [
                    {provide: Logger, useValue: stubLogger},
                    {provide: LoginModalService, useValue: stubLoginModalService}
                ]
            }).compileComponents().then(() => {
                fixture = TestBed.createComponent(LoginModalComponent);
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
            el = util.getNativeEl('.close');
            de = util.getDebugEl('.close');
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
            expect(el.children[0].tagName).toEqual('A');
            expect(el.children[1].tagName).toEqual('A');
        });
    });
}
