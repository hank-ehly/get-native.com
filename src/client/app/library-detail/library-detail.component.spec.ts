/**
 * library-detail.component.spec
 * get-native.com
 *
 * Created by henryehly on 2016/12/24.
 */

import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';

import { LibraryDetailComponent } from './library-detail.component';
import { SharedModule } from '../shared/shared.module';
import {
    MockHTTPClient,
    Logger,
    STUBLogger,
    NavbarService,
    STUBNavbarService,
    STUBMockHTTPClient,
    STUBDateFormatter,
    DateFormatter,
    SpecUtil
} from '../core/index';

export function main() {
    let comp: LibraryDetailComponent;
    let fixture: ComponentFixture<LibraryDetailComponent>;
    let de: DebugElement;
    let el: HTMLElement;
    let util: SpecUtil;

    describe('LibraryDetailComponent', () => {
        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SharedModule, RouterModule.forRoot([])],
                declarations: [LibraryDetailComponent],
                providers: [
                    {provide: Logger, useValue: STUBLogger},
                    {provide: NavbarService, useValue: STUBNavbarService},
                    {provide: MockHTTPClient, useValue: STUBMockHTTPClient},
                    {provide: DateFormatter, useValue: STUBDateFormatter},
                    {provide: APP_BASE_HREF, useValue: '<%= APP_BASE %>'},
                ]
            }).compileComponents().then(() => {
                fixture = TestBed.createComponent(LibraryDetailComponent);
                util = new SpecUtil(fixture);
                comp = fixture.componentInstance;
                fixture.detectChanges();
            });
        }));

        it('should display a video player', () => {
            let player = util.getNativeEl('video');
            expect(player).toBeTruthy();
        });

        it('should display a video description', () => {
            let description = util.getNativeEl('.section--video-detail .column__row .paragraph');
            expect(description.textContent.length).toBeGreaterThan(0);
        });
    });
}
