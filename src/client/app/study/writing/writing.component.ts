/**
 * writing.component
 * get-native.com
 *
 * Created by henryehly on 2016/12/11.
 */

import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { StudySessionService } from '../../core/study-session/study-session.service';
import { Collocations } from '../../core/entities/collocations';
import { Transcript } from '../../core/entities/transcript';
import { Logger } from '../../core/logger/logger';

import { Subscription } from 'rxjs/Subscription';
import * as _ from 'lodash';
import { Transcripts } from '../../core/entities/transcripts';

@Component({
    moduleId: module.id,
    templateUrl: 'writing.component.html',
    styleUrls: ['writing.component.css']
})
export class WritingComponent implements OnInit, OnDestroy {
    // todo: Make sure you're getting the right language
    collocations: Collocations;

    questionText$  = this.route.data.pluck('question', 'text');
    exampleAnswer$ = this.route.data.pluck('question', 'example_answer');

    private subscriptions: Subscription[] = [];

    constructor(private logger: Logger, private session: StudySessionService, private router: Router, private route: ActivatedRoute) {
        const transcript: Transcript = _.find(this.session.current.video.transcripts.records, {
            language_code: this.session.current.video.language_code
        });

        this.logger.debug(this, 'transcript', transcript);

        this.collocations = transcript.collocations;
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
}
