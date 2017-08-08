/**
 * listening.component
 * getnativelearning.com
 *
 * Created by henryehly on 2016/12/11.
 */

import { Component, OnDestroy, OnInit } from '@angular/core';

import { StudySessionService } from '../../core/study-session/study-session.service';
import { kShadowing } from '../../core/study-session/section-keys';
import { Transcript } from '../../core/entities/transcript';
import { Entities } from '../../core/entities/entities';
import { Logger } from '../../core/logger/logger';

import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/take';
import * as _ from 'lodash';

@Component({
    templateUrl: 'listening.component.html',
    styleUrls: ['listening.component.scss']
})
export class ListeningComponent implements OnInit, OnDestroy {
    transcripts: Entities<Transcript> = this.session.current.video.transcripts;
    src: string = this.session.current.video.video_url;

    subscriptions: Subscription[] = [];

    constructor(private logger: Logger, private session: StudySessionService) {
    }

    ngOnInit(): void {
        this.logger.debug(this, 'OnInit');

        this.subscriptions.push(
            this.session.progressEmitted$.subscribe(this.session.progress.listeningEmitted$),
            this.session.progressEmitted$.subscribe(null, null, () => this.session.transition(kShadowing))
        );
    }

    ngOnDestroy(): void {
        this.logger.debug(this, 'OnDestroy');
        _.each(this.subscriptions, s => s.unsubscribe());
    }
}
