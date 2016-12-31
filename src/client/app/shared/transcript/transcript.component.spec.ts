/**
 * transcript.component.spec
 * get-native.com
 *
 * Created by henryehly on 2016/12/29.
 */

import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { TranscriptComponent } from './transcript.component';
import { STUBTranscripts, STUBLogger, Logger, LangService } from '../../core/index';
import { SpecUtil } from '../../core/spec/spec-util';

export function main() {
    let comp: TranscriptComponent;
    let fixture: ComponentFixture<TranscriptComponent>;
    let de: DebugElement;
    let el: HTMLElement;
    let util: SpecUtil;

    describe('TranscriptComponent', () => {
        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [TranscriptComponent],
                providers: [{provide: Logger, useValue: STUBLogger}, LangService]
            }).compileComponents().then(() => {
                fixture = TestBed.createComponent(TranscriptComponent);
                util = new SpecUtil(fixture);
                comp = fixture.componentInstance;
                comp.transcripts = STUBTranscripts;
                fixture.detectChanges();
            });
        }));

        it('should display 2 or more tabs', () => {
            let tabs = util.getNativeEl('.tabs-frame .tabs');
            expect(tabs.children.length).toBeGreaterThanOrEqual(2);
        });

        it('should display transcript content', () => {
            let content = util.getNativeEl('.tab-content .content');
            expect(content.textContent.length).toBeGreaterThan(0);
        });
    });
}
