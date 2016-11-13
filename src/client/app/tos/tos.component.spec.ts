/**
 * tos.component.spec
 * get-native.com
 *
 * Created by henryehly on 2016/11/10.
 */

import { Component } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';

import { TOSModule } from './tos.module';

export function main() {
    describe('TOSComponent', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [TestComponent],
                imports: [TOSModule]
            });
        });

        it('should compile', async(() => {
            TestBed.compileComponents().then(() => {
                let fixture = TestBed.createComponent(TestComponent);
                let compiled = fixture.nativeElement;
                expect(compiled).toBeTruthy();
            });
        }));

        it('should display the moderator email address', async(() => {
            TestBed.compileComponents().then(() => {
                let fixture = TestBed.createComponent(TestComponent);
                fixture.detectChanges();
                let privacyDOME1 = fixture.debugElement.children[0].nativeElement;
                expect(privacyDOME1.querySelector('.mail').textContent).toEqual('getnative.moderator@gmail.com');
            });
        }));
    });
}

@Component({
    selector: 'test-cmp',
    template: '<gn-tos></gn-tos>'
})


class TestComponent {
}
