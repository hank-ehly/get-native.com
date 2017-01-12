/**
 * dashboard.component.spec
 * get-native.com
 *
 * Created by henryehly on 2016/11/28.
 */

import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { Router } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { NavbarService, STUBRouter, UTCDateService, Logger, STUBLogger, SpecUtil, STUBMockHTTPClient, MockHTTPClient } from '../core/index';

export function main() {
    let comp: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;
    let de: DebugElement;
    let el: HTMLElement;
    let util: SpecUtil;

    describe('DashboardComponent', () => {
        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SharedModule],
                declarations: [DashboardComponent],
                providers: [
                    {provide: Router, useValue: STUBRouter},
                    {provide: Logger, useValue: STUBLogger},
                    {provide: MockHTTPClient, useValue: STUBMockHTTPClient},
                    UTCDateService,
                    NavbarService
                ]
            }).compileComponents().then(() => {
                fixture = TestBed.createComponent(DashboardComponent);
                util = new SpecUtil(fixture);
                comp = fixture.componentInstance;
                fixture.detectChanges();
            });
        }));

        it('should display cued videos', () => {
            el = util.getNativeEl('.video-panels');
            expect(el.children.length).toBeGreaterThan(0);
        });
    });
}
