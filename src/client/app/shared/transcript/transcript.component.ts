/**
 * transcript.component
 * get-native.com
 *
 * Created by henryehly on 2016/12/09.
 */

import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

import { Logger, Transcripts, Transcript, LangService } from '../../core/index';
import { Collocation } from '../../core/entities/collocation';

@Component({
    moduleId: module.id,
    selector: 'gn-transcript',
    templateUrl: 'transcript.component.html',
    styleUrls: ['transcript.component.css']
})
export class TranscriptComponent implements OnInit, OnChanges {
    @Input() transcripts: Transcripts;
    activeTabElement: HTMLLIElement;
    selectedTranscript: Transcript;
    selectedCollocation: Collocation;

    constructor(private logger: Logger, private langService: LangService) {
    }

    ngOnInit() {
        this.logger.info(`[${this.constructor.name}] ngOnInit()`);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (!changes['transcripts']) {
            return;
        }

        let transcripts = <Transcripts>changes['transcripts'].currentValue;

        if (transcripts.count === 0) {
            return;
        }

        this.logger.debug(changes);

        /* Todo: How can you set the activeTabElement here? */

        this.selectedTranscript = transcripts.records[0];

        /* Todo: Set active collocation */
        this.selectedCollocation = transcripts.records[0].collocations.records[0];
    }

    onClickTab(transcript: Transcript, e: MouseEvent): void {
        this.logger.debug(`[${this.constructor.name}] onClickTabTitle => title: ${this.titleForTranscript(transcript)}, event:`, e);
        this.activeTabElement = <HTMLLIElement>e.target;
        this.selectedTranscript = transcript;

        /* Todo: If previous selection exists, use that */
        this.selectedCollocation = transcript.collocations.records[0];
    }

    get sliderPosition() {
        if (!this.activeTabElement) {
            return null;
        }

        return {
            left: `${this.activeTabElement.offsetLeft}px`,
            width: `${this.activeTabElement.offsetWidth}px`
        };
    }

    titleForTranscript(transcript: Transcript): string {
        return this.langService.codeToName(transcript.lang);
    }
}
