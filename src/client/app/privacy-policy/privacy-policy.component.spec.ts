/**
 * privacy-policy.component.spec
 * get-native.com
 *
 * Created by henryehly on 2016/11/08.
 */

import { Component } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';

import { PrivacyPolicyModule } from './privacy-policy.module';

export function main() {
    describe('PrivacyPolicyComponent', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [TestComponent],
                imports: [PrivacyPolicyModule]
            });
        });

        it('should display the moderator email address', async(() => {
            TestBed.compileComponents().then(() => {
                let fixture = TestBed.createComponent(TestComponent);
                fixture.detectChanges();
                let privacyPolicyDOME1 = fixture.debugElement.children[0].nativeElement;
                expect(privacyPolicyDOME1.querySelectorAll('address a')[0].textContent).toEqual('getnative.moderator@gmail.com');
            });
        }));
    });
}

@Component({
    selector: 'test-cmp',
    template: '<gn-privacy-policy></gn-privacy-policy>'
})

class TestComponent {
}
