/**
 * transcript.component.spec
 * get-native.com
 *
 * Created by henryehly on 2016/12/29.
 */

import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { TranscriptComponent } from './transcript.component';
import { SpecUtil } from '../../core/spec/spec-util';
import { Logger } from '../../core/logger/logger';
import { STUBLogger } from '../../core/logger/logger.stub';
import { LangService } from '../../core/lang/lang.service';
import { STUBTranscripts } from '../../core/entities/transcripts.stub';
import { SafeHtmlPipe } from '../safe-html/safe-html.pipe';

describe('TranscriptComponent', () => {
    let comp: TranscriptComponent;
    let fixture: ComponentFixture<TranscriptComponent>;
    let util: SpecUtil;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TranscriptComponent, SafeHtmlPipe],
            providers: [{provide: Logger, useValue: STUBLogger}, LangService]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(TranscriptComponent);
            util = new SpecUtil(fixture);
            comp = fixture.componentInstance;
            comp.transcripts = STUBTranscripts;
            comp.selectedCollocationOccurrence = STUBTranscripts.records[0].collocation_occurrences.records[0];
            fixture.detectChanges();
        });
    }));

    it('should display 2 or more tabs', () => {
        const tabs = util.getNativeEl('.tabs-frame .tabs');
        expect(tabs.children.length).toBeGreaterThanOrEqual(2);
    });

    it('should display transcript content', () => {
        const content = util.getNativeEl('.tab-content .content');
        expect(content.textContent.length).toBeGreaterThan(0);
    });

    it('should display the selected collocation occurrence', () => {
        const collocationOccurrence = util.getNativeEl('.usage-examples-section__header-collocation-occurrence');
        expect(collocationOccurrence.textContent.length).toBeGreaterThan(0);
    });

    it('should display 1+ usage examples', () => {
        const examples = util.getNativeEl('.usage-examples');
        expect(examples.children.length).toBeGreaterThanOrEqual(1);
    });
});
