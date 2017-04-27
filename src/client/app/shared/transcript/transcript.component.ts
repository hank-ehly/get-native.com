/**
 * transcript.component
 * get-native.com
 *
 * Created by henryehly on 2016/12/09.
 */

import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { Transcripts } from '../../core/entities/transcripts';
import { Transcript } from '../../core/entities/transcript';
import { Collocation } from '../../core/entities/collocation';
import { LangService } from '../../core/lang/lang.service';
import { Logger } from '../../core/logger/logger';

import * as _ from 'lodash';

@Component({
    moduleId: module.id,
    selector: 'gn-transcript',
    templateUrl: 'transcript.component.html',
    styleUrls: ['transcript.component.css']
})
export class TranscriptComponent implements OnInit, OnDestroy {
    get transcripts(): Transcripts {
        return this._transcripts;
    }

    @Input() set transcripts(transcripts: Transcripts) {
        if (!transcripts || !transcripts.count) {
            return;
        }

        this._transcripts = transcripts;

        this.tabs = _.transform(this.transcripts.records, (result, transcript) => {
            result.push({
                title: this.langService.codeToName(transcript.language_code),
                transcript: transcript
            });
        });

        this.logger.debug(this, 'set transcripts', transcripts);

        /* Todo: How can you set the activeTab here? */

        this.selectedTranscript = _.first(transcripts.records);

        /* Todo: Set active collocation */
        this.selectedCollocation = _.first(this.selectedTranscript.collocations.records);
    };

    tabs: any[] = [];

    selectedTab: HTMLLIElement;
    selectedTranscript: Transcript;
    selectedCollocation: Collocation;

    private _transcripts: Transcripts;

    constructor(private logger: Logger, private langService: LangService) {
    }

    ngOnInit(): void {
        this.logger.debug(this, 'OnInit');
    }

    ngOnDestroy(): void {
        this.logger.debug(this, 'OnDestroy');
    }

    getSliderPosition() {
        if (!this.selectedTab) return null;

        return {
            left: `${this.selectedTab.offsetLeft }px`, width: `${this.selectedTab.offsetWidth}px`
        };
    }

    onClickTab(tab: any, e: MouseEvent): void {
        this.logger.debug(this, 'onClickTab', tab.transcript);

        this.selectedTab = <HTMLLIElement>e.target;
        this.selectedTranscript = tab.transcript;

        /* Todo: If previous selection exists, use that */
        this.selectedCollocation = _.first(this.selectedTranscript.collocations.records);
    }
}
