/**
 * dashboard.component.spec
 * get-native.com
 *
 * Created by henryehly on 2016/11/28.
 */

import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';

export function main() {
    let comp: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;
    // let de: DebugElement;
    // let el: HTMLElement;

    describe('DashboardComponent', () => {
        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [
                    DashboardComponent
                ]
            }).compileComponents().then(() => {
                fixture = TestBed.createComponent(DashboardComponent);
                comp = fixture.componentInstance;
                fixture.detectChanges();
            });
        }));

        it('should work', () => {

        });
    });
}
