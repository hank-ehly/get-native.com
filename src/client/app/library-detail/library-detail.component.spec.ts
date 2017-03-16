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
import { HttpService } from '../core/http/http.service';
import { STUBHttpService } from '../core/http/http.service.stub';
import { SpecUtil } from '../core/spec/spec-util';
import { Logger } from '../core/logger/logger';
import { STUBLogger } from '../core/logger/logger.stub';
import { NavbarService } from '../core/navbar/navbar.service';
import { LangService } from '../core/lang/lang.service';
import { UTCDateService } from '../core/utc-date/utc-date.service';

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
                    NavbarService,
                    {provide: HttpService, useValue: STUBHttpService},
                    {provide: APP_BASE_HREF, useValue: '<%= APP_BASE %>'},
                    LangService,
                    UTCDateService
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

        it('should display related videos', () => {
            let related_videos = util.getNativeEl('.section_related-videos .video-panels');
            expect(related_videos.children.length).toBeGreaterThan(0);
        });

        it('should display related videos in multiples of 3', () => {
            let related_videos = util.getNativeEl('.section_related-videos .video-panels');
            expect(related_videos.children.length % 3).toEqual(0);
        });
    });
}
