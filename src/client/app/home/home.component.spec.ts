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

        it('should have 3 main features', async(() => {
            TestBed.compileComponents().then(() => {
                let fixture = TestBed.createComponent(TestComponent);
                fixture.detectChanges();
                let homeDOME1 = fixture.debugElement.children[0].nativeElement;
                expect(homeDOME1.querySelectorAll('.main-features ul').length).toEqual(3);
            });
        }));

        it('should have 6 secondary features', async(() => {
            TestBed.compileComponents().then(() => {
                let fixture = TestBed.createComponent(TestComponent);
                fixture.detectChanges();
                let homeDOME1 = fixture.debugElement.children[0].nativeElement;
                expect(homeDOME1.querySelectorAll('.secondary-features li').length).toEqual(6);
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
