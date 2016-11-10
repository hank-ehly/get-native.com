/**
 * privacy.component.spec
 * get-native.com
 *
 * Created by henryehly on 2016/11/08.
 */

import { Component } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';

import { PrivacyModule } from './privacy.module';

export function main() {
    describe('PrivacyComponent', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [TestComponent],
                imports: [PrivacyModule]
            });
        });

        it('should display the moderator email address', async(() => {
            TestBed.compileComponents().then(() => {
                let fixture = TestBed.createComponent(TestComponent);
                fixture.detectChanges();
                let privacyDOME1 = fixture.debugElement.children[0].nativeElement;
                expect(privacyDOME1.querySelectorAll('address a')[0].textContent).toEqual('getnative.moderator@gmail.com');
            });
        }));
    });
}

@Component({
    selector: 'test-cmp',
    template: '<gn-privacy></gn-privacy>'
})

class TestComponent {
}
