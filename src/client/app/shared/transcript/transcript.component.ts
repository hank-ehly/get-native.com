/**
 * transcript.component
 * get-native.com
 *
 * Created by henryehly on 2016/12/09.
 */

import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

import { Logger, Transcripts, Transcript, LangService, Collocation } from '../../core/index';

@Component({
    moduleId: module.id,
    selector: 'gn-transcript',
    templateUrl: 'transcript.component.html',
    styleUrls: ['transcript.component.css']
})
export class TranscriptComponent implements OnInit, OnChanges {
    @Input() transcripts: Transcripts;
    selectedTab: HTMLLIElement;
    selectedTranscript: Transcript;
    selectedCollocation: Collocation;

    constructor(private logger: Logger, private langService: LangService) {
    }

    ngOnInit() {
        this.logger.info(this, 'ngOnInit()');
    }

    ngOnChanges(changes: SimpleChanges) {
        if (!changes['transcripts'] || !changes['transcripts'].currentValue) {
            return;
        }

        let transcripts = <Transcripts>changes['transcripts'].currentValue;

        if (transcripts.count === 0) {
            return;
        }

        this.logger.debug(this, changes);

        /* Todo: How can you set the activeTab here? */

        this.selectedTranscript = transcripts.records[0];

        /* Todo: Set active collocation */
        this.selectedCollocation = transcripts.records[0].collocations.records[0];
    }

    onClickTab(transcript: Transcript, e: MouseEvent): void {
        this.logger.debug(this, `onClickTabTitle => title: ${this.titleForTranscript(transcript)}, event:`, e);
        this.selectedTab = <HTMLLIElement>e.target;
        this.selectedTranscript = transcript;

        /* Todo: If previous selection exists, use that */
        this.selectedCollocation = transcript.collocations.records[0];
    }

    get sliderPosition() {
        if (!this.selectedTab) {
            return null;
        }

        return {
            left: `${this.selectedTab.offsetLeft}px`,
            width: `${this.selectedTab.offsetWidth}px`
        };
    }

    titleForTranscript(transcript: Transcript): string {
        return this.langService.codeToName(transcript.lang);
    }
}
