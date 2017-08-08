/**
 * writing.component
 * getnativelearning.com
 *
 * Created by henryehly on 2016/12/11.
 */

import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { StudySessionService } from '../../core/study-session/study-session.service';
import { WordCountService } from '../../core/word-count/word-count.service';
import { WritingQuestion } from '../../core/entities/writing-question';
import { Transcript } from '../../core/entities/transcript';
import { Logger } from '../../core/logger/logger';

import { Subscription } from 'rxjs/Subscription';
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

    private subscriptions: Subscription[] = [];

    constructor(private logger: Logger, private session: StudySessionService, private router: Router, private route: ActivatedRoute,
                private wc: WordCountService) {
        this.transcript = _.find(this.session.current.video.transcripts.records, {
            language: this.session.current.video.language
        });
    }

    ngOnInit(): void {
        this.logger.debug(this, 'OnInit');

        this.subscriptions.push(
            this.session.progressEmitted$.subscribe(this.session.progress.writingEmitted$),
            this.session.progressEmitted$.subscribe(null, null, () => this.router.navigate(['/study/results'])),
            this.route.data.pluck('question').subscribe((q: WritingQuestion) => {
                this.logger.debug(this, q);
                this.question = q;
            })
        );
    }

    ngOnDestroy(): void {
        this.logger.debug(this, 'OnDestroy');
        _.each(this.subscriptions, s => s.unsubscribe());
    }

    onInput(e: Event): void {
        const input = (<HTMLTextAreaElement>e.target).value;
        this.answer = input;
        const count = this.wc.count(input, this.transcript.language.code);
        this.logger.debug(this, 'count', count);
        this.wordCount = count;
    }
}
