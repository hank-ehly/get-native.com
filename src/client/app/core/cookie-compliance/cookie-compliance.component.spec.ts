/**
 * cookie-compliance.component.spec
 * get-native.com
 *
 * Created by henryehly on 2016/11/11.
 */

import { Component } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';

import { CoreModule } from '../core.module';

export function main() {
    describe('CookieComplianceComponent', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CoreModule],
                declarations: [TestComponent]
            });
        });

        it('should compile', async(() => {
            TestBed.compileComponents().then(() => {
                let fixture = TestBed.createComponent(TestComponent);
                let compiled = fixture.nativeElement;
                expect(compiled).toBeTruthy();
            });
        }));
    });
}

@Component({
    selector: 'test-cmp',
    template: '<gn-cookie-compliance></gn-cookie-compliance>'
})

class TestComponent {
}
