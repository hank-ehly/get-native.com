/**
 * writing.component
 * getnativelearning.com
 *
 * Created by henryehly on 2016/12/11.
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StudySessionService } from '../../core/study-session/study-session.service';
import { WordCountService } from '../../core/word-count/word-count.service';
import { WritingQuestion } from '../../core/entities/writing-question';
import { Transcript } from '../../core/entities/transcript';
import { Logger } from '../../core/logger/logger';

import 'rxjs/add/operator/startWith';
import * as _ from 'lodash';

@Component({
    templateUrl: 'writing.component.html',
    styleUrls: ['writing.component.scss']
})
export class WritingComponent implements OnInit, OnDestroy {

    transcript: Transcript;

    question: WritingQuestion;
    answer = '';
    wordCount = 0;

    constructor(private logger: Logger, private session: StudySessionService, private router: Router, private wc: WordCountService) {
        this.transcript = _.find(this.session.current.video.transcripts.records, {language: this.session.current.video.language});
    }

    ngOnInit(): void {
        this.logger.debug(this, 'OnInit');
        this.question = this.session.current.writingQuestion;
        this.session.startSectionTimer();
        this.session.timeLeftEmitted$.filter(time => time === 0).subscribe(() => {
            this.router.navigate(['/study/results']);
        });
    }

    ngOnDestroy(): void {
        this.logger.debug(this, 'OnDestroy');
    }

    onInput(e: Event): void {
        const input = (<HTMLTextAreaElement>e.target).value;
        this.answer = input;
        const count = this.wc.count(input, this.transcript.language.code);
        this.logger.debug(this, 'count', count);
        this.wordCount = count;
    }

}
