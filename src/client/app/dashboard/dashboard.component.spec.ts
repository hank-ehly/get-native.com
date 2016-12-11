/**
 * dashboard.component.spec
 * get-native.com
 *
 * Created by henryehly on 2016/11/28.
 */

import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Router } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { NavbarService, STUBRouter } from '../core/index';

export function main() {
    let comp: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;

    describe('DashboardComponent', () => {
        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SharedModule],
                declarations: [DashboardComponent],
                providers: [NavbarService, {provide: Router, useValue: STUBRouter},]
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
