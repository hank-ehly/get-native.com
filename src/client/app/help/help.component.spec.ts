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

        it('should work', async(() => {
            TestBed.compileComponents().then(() => {
                // let fixture = TestBed.createComponent(TestComponent);
                // fixture.detectChanges();
                // let helpDOME1 = fixture.debugElement.children[0].nativeElement;
                // expect(helpDOME1.querySelectorAll('.main-features ul').length).toEqual(3);
            });
        }));
    });
}

@Component({
    selector: 'test-cmp',
    template: '<gn-help></gn-help>'
})

class TestComponent {
}
