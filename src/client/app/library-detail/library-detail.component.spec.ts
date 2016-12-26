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
    STUBTimeFormatService,
    TimeFormatService
} from '../core/index';

export function main() {
    let comp: LibraryDetailComponent;
    let fixture: ComponentFixture<LibraryDetailComponent>;
    let de: DebugElement;
    let el: HTMLElement;

    describe('LibraryDetailComponent', () => {
        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SharedModule, RouterModule.forRoot([])],
                declarations: [LibraryDetailComponent],
                providers: [
                    {provide: Logger, useValue: STUBLogger},
                    {provide: NavbarService, useValue: STUBNavbarService},
                    {provide: MockHTTPClient, useValue: STUBMockHTTPClient},
                    {provide: TimeFormatService, useValue: STUBTimeFormatService},
                    {provide: APP_BASE_HREF, useValue: '<%= APP_BASE %>'},
                ]
            }).compileComponents().then(() => {
                fixture = TestBed.createComponent(LibraryDetailComponent);
                comp = fixture.componentInstance;
                fixture.detectChanges();
            });
        }));

        it('should compile', () => {

        });
    });
}
