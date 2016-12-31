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

export function main() {
    let comp: TranscriptComponent;
    let fixture: ComponentFixture<TranscriptComponent>;
    let de: DebugElement;
    let el: HTMLElement;

    describe('TranscriptComponent', () => {
        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [TranscriptComponent],
                providers: [{provide: Logger, useValue: STUBLogger}, LangService]
            }).compileComponents().then(() => {
                fixture = TestBed.createComponent(TranscriptComponent);
                comp = fixture.componentInstance;
                comp.transcripts = STUBTranscripts;
                fixture.detectChanges();
            });
        }));

        /* Todo: How do you test with an Input() variable? */
        it('should work', () => {

        });
    });
}
