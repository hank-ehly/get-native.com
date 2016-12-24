/**
 * library-detail.component.spec
 * get-native.com
 *
 * Created by henryehly on 2016/12/24.
 */

import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { LibraryDetailComponent } from './library-detail.component';

export function main() {
    let comp: LibraryDetailComponent;
    let fixture: ComponentFixture<LibraryDetailComponent>;
    let de: DebugElement;
    let el: HTMLElement;

    describe('LibraryDetailComponent', () => {
        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [
                    LibraryDetailComponent
                ]
            }).compileComponents().then(() => {
                fixture = TestBed.createComponent(LibraryDetailComponent);
                comp = fixture.componentInstance;
                fixture.detectChanges();
            });
        }));

        it('should work', () => {

        });
    });
}
