/**
 * tooltip.component.spec
 * get-native.com
 *
 * Created by henryehly on 2016/12/14.
 */

import { DebugElement } from '@angular/core';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { ToolbarComponent } from './toolbar.component';
import { Logger } from '../../core/logger/logger';
import { LocalStorageService } from '../../core/local-storage/local-storage.service';
import { STUBLocalStorageService } from '../../core/local-storage/local-storage.service.stub';
import { STUBUserService } from '../../core/user/user.service.stub';
import { STUBHttpService } from '../../core/http/http.service.stub';
import { ToolbarService } from '../../core/toolbar/toolbar.service';
import { LangService } from '../../core/lang/lang.service';
import { HttpService } from '../../core/http/http.service';
import { SpecUtil } from '../../core/spec/spec-util';
import { UserService } from '../../core/user/user.service';
import { STUBLogger } from '../../core/logger/logger.stub';

export function main() {
    let comp: ToolbarComponent;
    let fixture: ComponentFixture<ToolbarComponent>;
    let de: DebugElement;
    let util: SpecUtil;

    describe('ToolbarComponent', () => {
        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RouterModule.forRoot([])],
                declarations: [ToolbarComponent],
                providers: [
                    {provide: Logger, useValue: STUBLogger},
                    {provide: LocalStorageService, useClass: STUBLocalStorageService},
                    {provide: APP_BASE_HREF, useValue: '<%= APP_BASE %>'},
                    {provide: UserService, useClass: STUBUserService},
                    {provide: HttpService, useValue: STUBHttpService},
                    LangService,
                    ToolbarService
                ]
            }).compileComponents().then(() => {
                fixture = TestBed.createComponent(ToolbarComponent);
                util = new SpecUtil(fixture);
                comp = fixture.componentInstance;
                fixture.detectChanges();
            });
        }));

        it('should hide the tooltip by default', () => {
            de = util.getDebugEl('.toolbar__tooltip-languages');
            expect(de).toBeNull();
        });

        it('should initialize the tooltip after the visibility property becomes \'true\'', () => {
            comp.isTooltipVisible = true;
            fixture.detectChanges();

            de = util.getDebugEl('.toolbar__tooltip-languages');
            expect(de).not.toBeNull();
        });
    });
}
