/**
 * help.component.spec
 * get-native.com
 *
 * Created by henryehly on 2016/11/08.
 */

import { Component } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';

import { HelpModule } from './help.module';

export function main() {
    describe('HelpModule', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [TestComponent],
                imports: [HelpModule]
            });
        });

        it('should compile', async(() => {
            TestBed.compileComponents().then(() => {
                let fixture = TestBed.createComponent(TestComponent);
                let compiled = fixture.nativeElement;
                expect(compiled).toBeTruthy();
            });
        }));

        // it('should load the faqs', async(() => {
        //     TestBed.compileComponents().then(() => {
        //         let fixture = TestBed.createComponent(TestComponent);
        //         let compiled = fixture.nativeElement;
        //         expect(compiled).toBeTruthy();
        //     });
        // }));
    });
}

@Component({
    selector: 'test-cmp',
    template: '<gn-help></gn-help>'
})

class TestComponent {
}
