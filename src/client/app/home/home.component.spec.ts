/**
 * home.component.spec
 * get-native.com
 *
 * Created by henryehly on 2016/11/08.
 */

import { Component } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';

import { HomeModule } from './home.module';

export function main() {
    describe('HomeModule', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [TestComponent],
                imports: [HomeModule]
            });
        });

        it('should display 3 large features', async(() => {
            TestBed.compileComponents().then(() => {
                let fixture = TestBed.createComponent(TestComponent);
                fixture.detectChanges();
                let homeDOME1 = fixture.debugElement.children[0].nativeElement;
                expect(homeDOME1.querySelectorAll('.large-feature').length).toEqual(3);
            });
        }));

        it('should display 6 small features', async(() => {
            TestBed.compileComponents().then(() => {
                let fixture = TestBed.createComponent(TestComponent);
                fixture.detectChanges();
                let homeDOME1 = fixture.debugElement.children[0].nativeElement;
                expect(homeDOME1.querySelectorAll('.small-feature').length).toEqual(6);
            });
        }));
    });
}

@Component({
    selector: 'test-cmp',
    template: '<gn-home></gn-home>'
})

class TestComponent {
}
