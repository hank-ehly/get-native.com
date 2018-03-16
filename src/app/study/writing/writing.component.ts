/**
 * writing.component
 * getnative.org
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
import { WritingAnswer } from '../../core/entities/writing-answer';
import { APIHandle } from '../../core/http/api-handle';
import { HttpService } from '../../core/http/http.service';
import { GNRequestOptions } from '../../core/http/gn-request-options';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import { APIErrors } from '../../core/http/api-error';

@Component({
    templateUrl: 'writing.component.html',
    styleUrls: ['writing.component.scss']
})
export class WritingComponent implements OnInit, OnDestroy {

    transcript: Transcript;

    question: WritingQuestion;
    answer = '';
    wordCount = 0;

    private OnDestroy$ = new Subject<void>();

    constructor(private logger: Logger, private session: StudySessionService, private router: Router, private wc: WordCountService,
                private http: HttpService) {
        this.transcript = _.find(this.session.current.video.transcripts.records, {language: this.session.current.video.language});
    }

    ngOnInit(): void {
        this.logger.debug(this, 'OnInit');
        this.question = this.session.current.writingQuestion;
        this.session.startSectionTimer();
        this.session.timeLeftEmitted$.filter(time => time === 0).subscribe(this.onTimerComplete.bind(this));
    }

    ngOnDestroy(): void {
        this.logger.debug(this, 'OnDestroy');
        this.OnDestroy$.next();
    }

    onInput(e: Event): void {
        const input = (<HTMLTextAreaElement>e.target).value;
        this.answer = input;
        const count = this.wc.count(input, this.transcript.language.code);
        this.logger.debug(this, 'count', count);
        this.wordCount = count;
    }

    private onTimerComplete(): void {
        this.logger.debug(this, 'writing timer complete');

        const sectionMinutes = ((this.session.current.session.study_time / 4) / 60);
        const wpm = _.round(this.wordCount / sectionMinutes);

        this.session.updateCurrentSessionCache({writingAnswer: {
            answer: this.answer,
            writing_question: this.question,
            word_count: this.wordCount,
            words_per_minute: wpm
        }});

        const options: GNRequestOptions = {
            body: {
                study_session_id: this.session.current.session.id,
                writing_question_id: this.question.id,
                answer: this.answer,
                word_count: this.wordCount
            }
        };

        this.http.request(APIHandle.CREATE_WRITING_ANSWER, options).toPromise().then(() => {
            this.logger.debug(this, 'created writing answer -- will now navigate to results page');
            return this.router.navigate(['/study/results']);
        }, (errors: APIErrors) => {
            //
        });
    }

}
