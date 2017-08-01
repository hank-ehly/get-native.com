/**
 * transcript.component
 * get-native.com
 *
 * Created by henryehly on 2016/12/09.
 */

import { Component, OnInit, Input, OnDestroy, ViewChild, ElementRef, HostListener } from '@angular/core';

import { CollocationOccurrence } from '../../core/entities/collocation-occurrence';
import { Transcript } from '../../core/entities/transcript';
import { Entities } from '../../core/entities/entities';
import { Logger } from '../../core/logger/logger';

import { Subject } from 'rxjs/Subject';
import * as _ from 'lodash';

@Component({
    selector: 'gn-transcript',
    templateUrl: 'transcript.component.html',
    styleUrls: ['transcript.component.scss']
})
export class TranscriptComponent implements OnInit, OnDestroy {
    @ViewChild('tabEls') tabEls: ElementRef;

    get transcripts(): Entities<Transcript> {
        return this._transcripts;
    }

    @Input() set transcripts(transcripts: Entities<Transcript>) {
        if (!transcripts || !transcripts.count) {
            return;
        }

        this._transcripts = transcripts;

        this.tabs = _.transform(this.transcripts.records, (result, transcript) => {
            result.push({
                title: transcript.language.name,
                transcript: transcript
            });
        });

        this.selectedTranscript = _.first(transcripts.records);
        this.selectedCollocationOccurrence = <CollocationOccurrence>_.first(this.selectedTranscript.collocation_occurrences.records);

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
    selectedCollocationOccurrence: CollocationOccurrence;

    private _transcripts: Entities<Transcript>;

    constructor(private logger: Logger) {
    }

    ngOnInit(): void {
        this.logger.debug(this, 'OnInit');
    }

    ngOnDestroy(): void {
        this.logger.debug(this, 'OnDestroy');
    }

    onClickTranscriptText(e: Event) {
        const className = (<HTMLElement>e.target).className;
        const id = _.toNumber((<HTMLElement>e.target).id);
        if (className.indexOf('collocation-occurrence') !== -1 && id) {
            this.selectedCollocationOccurrence = _.find(this.selectedTranscript.collocation_occurrences.records, {id: id});
            this.logger.debug(this, this.selectedCollocationOccurrence);
        }
    }

    onClickTab(tab: any, e: MouseEvent): void {
        this.logger.debug(this, 'onClickTab', tab.transcript);

        this.selectedTab$.next(<HTMLLIElement>e.target);
        this.selectedTranscript = tab.transcript;

        /* Todo: If previous selection exists, use that */
        this.selectedCollocationOccurrence = _.first(this.selectedTranscript.collocation_occurrences.records);
    }

    addMarkupToTranscriptText(text?: string): string {
        const collocationOccurrenceMatches = text.match(/{(.*?)}/g);

        if (!collocationOccurrenceMatches) {
            return;
        }

        for (const match of collocationOccurrenceMatches) {
            const unwrappedText = _.replace(match, /[{}]/g, '');
            const occurrence = _.find(this.selectedTranscript.collocation_occurrences.records, {text: unwrappedText});
            if (occurrence && occurrence.id) {
                const className = ['collocation-occurrence'];
                if (occurrence.id === this.selectedCollocationOccurrence.id) {
                    className.push('collocation-occurrence--selected');
                }
                text = _.replace(text, match, `<span id="${occurrence.id}" class="${className.join(' ')}">${unwrappedText}</span>`);
            }
        }

        return text;
    }

    addMarkupToUsageExampleText(text?: string): string {
        if (!text) {
            return;
        }

        const regExp = new RegExp(this.selectedCollocationOccurrence.text, 'gi');

        const lowercaseExample = _.lowerCase(text);
        const lowercaseCollocation = _.lowerCase(this.selectedCollocationOccurrence.text);
        const occurrence = lowercaseExample.indexOf(lowercaseCollocation) === 0 ? _.upperFirst(lowercaseCollocation) : lowercaseCollocation;
        const replacementOccurrence = `<span class="collocation-occurrence">${occurrence}</span>`;
        const replacement = _.replace(text, regExp, replacementOccurrence);

        return _.pad(replacement, replacement.length + 2, '"');
    }
}
