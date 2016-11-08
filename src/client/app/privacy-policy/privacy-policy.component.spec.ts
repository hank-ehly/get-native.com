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

        // TODO: title
        it('should work', async(() => {
            TestBed.compileComponents().then(() => {
                // TODO
                // let fixture = TestBed.createComponent(TestComponent);
                // let privacyPolicyDOME1 = fixture.debugElement.children[0].nativeElement;
                // expect(privacyPolicyDOME1.querySelectorAll('h2')[0].textContent).toEqual('Features');
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
