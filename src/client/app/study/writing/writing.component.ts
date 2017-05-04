/**
 * writing.component
 * get-native.com
 *
 * Created by henryehly on 2016/12/11.
 */

import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { StudySessionService } from '../../core/study-session/study-session.service';
import { Transcript } from '../../core/entities/transcript';
import { Logger } from '../../core/logger/logger';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/startWith';
import * as _ from 'lodash';

@Component({
    moduleId: module.id,
    templateUrl: 'writing.component.html',
    styleUrls: ['writing.component.css']
})
export class WritingComponent implements OnInit, OnDestroy {
    transcript: Transcript;

    questionText$  = this.route.data.pluck('question', 'text');
    exampleAnswer$ = this.route.data.pluck('question', 'example_answer');

    wordCount$: Observable<number>;
    private emitWordCount = new Subject<number>();

    private subscriptions: Subscription[] = [];

    constructor(private logger: Logger, private session: StudySessionService, private router: Router, private route: ActivatedRoute) {
        this.transcript = _.find(this.session.current.video.transcripts.records, {
            language_code: this.session.current.video.language_code
        });

        this.wordCount$ = this.emitWordCount.startWith(0);
    }

    ngOnInit(): void {
        this.logger.debug(this, 'OnInit');

        this.subscriptions.push(
            this.session.progressEmitted$.subscribe(this.session.progress.writingEmitted$),
            this.session.progressEmitted$.subscribe(null, null, () => this.router.navigate(['/study/results']))
        );
    }


    ngOnDestroy(): void {
        this.logger.debug(this, 'OnDestroy');
        _.each(this.subscriptions, s => s.unsubscribe());
    }

    // todo: what to exclude for different languages
    // todo: characters like じゃ should be 1 word
    onInput(e: Event): void {
        const s = (<HTMLTextAreaElement>e.target).value;
        let value: string = _.replace(s, /[.,\/#!$%\^&\*;:{}=\-_`~()、。「」『』！＠＃＄％＾＆＊（）：”’？＞＜＋＿｜]/g, '');

        let wordRegex = /[\S]+/g;

        if (this.transcript.language_code === 'ja') {
            wordRegex = /[\S]/g;
            value = _.replace(s, /[.,\/#!$%\^&\*;:{}=\-_`~()、。「」『』！＠＃＄％＾＆＊（）：”’？＞＜＋＿｜A-Za-z]/g, '');
        }

        const wordCount = _.words(value, wordRegex).length;
        this.logger.debug(this, 'wordCount', wordCount);
        this.emitWordCount.next(wordCount);
    }
}
