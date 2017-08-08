/**
 * library-detail.component.spec
 * getnativelearning.com
 *
 * Created by henryehly on 2016/12/24.
 */

import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
import { StudySessionService } from '../core/study-session/study-session.service';
import { LocalStorageService } from '../core/local-storage/local-storage.service';
import { STUBLocalStorageService } from '../core/local-storage/local-storage.service.stub';
import { FacebookService } from '../core/facebook/facebook.service';
import { STUBFacebookService } from '../core/facebook/facebook.service.stub';
import { MetaService } from '@ngx-meta/core';

describe('LibraryDetailComponent', () => {
    let comp: LibraryDetailComponent;
    let fixture: ComponentFixture<LibraryDetailComponent>;
    let util: SpecUtil;

    const stubMetaService = {
        setTitle(title: string, override?: boolean): void {
            return;
        }
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SharedModule, RouterModule.forRoot([]), BrowserAnimationsModule],
            declarations: [LibraryDetailComponent],
            providers: [
                {provide: Logger, useValue: STUBLogger},
                NavbarService,
                {provide: HttpService, useValue: STUBHttpService},
                {provide: APP_BASE_HREF, useValue: '<%= APP_BASE %>'},
                LangService,
                UTCDateService,
                StudySessionService,
                {provide: LocalStorageService, useValue: STUBLocalStorageService},
                {provide: FacebookService, useClass: STUBFacebookService},
                {provide: MetaService, useValue: stubMetaService}
            ]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(LibraryDetailComponent);
            util = new SpecUtil(fixture);
            comp = fixture.componentInstance;
            fixture.detectChanges();
        });
    }));

    it('should display a video player', () => {
        const player = util.getNativeEl('video');
        expect(player).toBeTruthy();
    });
});
