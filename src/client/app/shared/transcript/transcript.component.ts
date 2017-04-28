/**
 * transcript.component
 * get-native.com
 *
 * Created by henryehly on 2016/12/09.
 */

import { Component, OnInit, Input, OnDestroy, ViewChild, ElementRef } from '@angular/core';

import { Transcripts } from '../../core/entities/transcripts';
import { Transcript } from '../../core/entities/transcript';
import { Collocation } from '../../core/entities/collocation';
import { LangService } from '../../core/lang/lang.service';
import { Logger } from '../../core/logger/logger';

import { Subject } from 'rxjs/Subject';
import * as _ from 'lodash';

@Component({
    moduleId: module.id,
    selector: 'gn-transcript',
    templateUrl: 'transcript.component.html',
    styleUrls: ['transcript.component.css']
})
export class TranscriptComponent implements OnInit, OnDestroy {
    @ViewChild('tabEls') tabEls: ElementRef;

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

        this.selectedTranscript  = _.first(transcripts.records);
        this.selectedCollocation = _.first(this.selectedTranscript.collocations.records);

        /* Hack to access first LI element after setting transcripts */
        setTimeout(() => this.selectedTab$.next(<HTMLLIElement>_.first(this.tabEls.nativeElement.children)), 0);
    };

    tabs: any[] = [];

    selectedTab$ = new Subject<HTMLLIElement>();

    sliderPosition$ = this.selectedTab$.map(t => {
        return {
            left: `${t.offsetLeft}px`, width: `${t.offsetWidth}px`
        };
    });

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

    onClickTab(tab: any, e: MouseEvent): void {
        this.logger.debug(this, 'onClickTab', tab.transcript);

        this.selectedTab$.next(<HTMLLIElement>e.target);
        this.selectedTranscript = tab.transcript;

        /* Todo: If previous selection exists, use that */
        this.selectedCollocation = _.first(this.selectedTranscript.collocations.records);
    }
}
