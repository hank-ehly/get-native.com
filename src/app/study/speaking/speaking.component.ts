/**
 * speaking.component
 * getnativelearning.com
 *
 * Created by henryehly on 2016/12/11.
 */

import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { StudySessionService } from '../../core/study-session/study-session.service';
import { CollocationOccurrence } from '../../core/entities/collocation-occurrence';
import { TranscriptComponent } from '../../shared/transcript/transcript.component';
import { StudySessionSection } from '../../core/typings/study-session-section';
import { Transcript } from '../../core/entities/transcript';
import { Entities } from '../../core/entities/entities';
import { Logger } from '../../core/logger/logger';

import * as _ from 'lodash';

@Component({
    templateUrl: 'speaking.component.html',
    styleUrls: ['speaking.component.scss']
})
export class SpeakingComponent implements OnInit, OnDestroy {

    @ViewChild(TranscriptComponent) transcriptComponent: TranscriptComponent;
    transcripts: Entities<Transcript> = this.session.current.video.transcripts;
    occurrences: CollocationOccurrence[] = null;
    current: CollocationOccurrence = null;
    completed = new Set();
    overflow = 0;

    private get currentIndex(): number {
        return _.findIndex(this.occurrences, this.current);
    }

    constructor(private logger: Logger, private session: StudySessionService) {
        this.occurrences = _.find(this.transcripts.records, <Transcript>{
            language: {code: this.session.current.video.language.code}
        }).collocation_occurrences.records;
        this.current = _.first(this.occurrences);
    }

    ngOnInit(): void {
        this.logger.debug(this, 'OnInit');
        this.session.startSectionTimer();
        this.session.timeLeftEmitted$.filter(time => time === 0).subscribe(() => {
            this.session.transition(StudySessionSection.Writing);
        });
    }

    ngOnDestroy(): void {
        this.logger.debug(this, 'OnDestroy');
    }

    onClickNext(): void {
        if (this.completed.has(this.currentIndex) && this.completed.size === this.occurrences.length) {
            this.overflow += 1;
        } else {
            this.completed.add(this.currentIndex);
        }

        this.nextOccurrence();
    }

    onClickSkip(): void {
        this.nextOccurrence();
    }

    private nextOccurrence(): void {
        if (this.currentIndex === this.occurrences.length - 1) {
            this.current = _.first(this.occurrences);
        } else {
            this.current = this.occurrences[this.currentIndex + 1];
        }
        this.transcriptComponent.selectedCollocationOccurrence = this.current;
    }

}
