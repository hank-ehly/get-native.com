/**
 * speaking.component
 * get-native.com
 *
 * Created by henryehly on 2016/12/11.
 */

import { Component, OnDestroy, OnInit } from '@angular/core';

import { StudySessionService } from '../../core/study-session/study-session.service';
import { kWriting } from '../../core/study-session/section-keys';
import { Transcripts } from '../../core/entities/transcripts';
import { Logger } from '../../core/logger/logger';

import { Subscription } from 'rxjs/Subscription';
import * as _ from 'lodash';

@Component({
    templateUrl: 'speaking.component.html',
    styleUrls: ['speaking.component.scss']
})
export class SpeakingComponent implements OnInit, OnDestroy {
    transcripts: Transcripts = this.session.current.video.transcripts;

    subscriptions: Subscription[] = [];

    constructor(private logger: Logger, private session: StudySessionService) {
    }

    ngOnInit(): void {
        this.logger.debug(this, 'OnInit');

        this.subscriptions.push(
            this.session.progressEmitted$.subscribe(this.session.progress.speakingEmitted$),
            this.session.progressEmitted$.subscribe(null, null, () => this.session.transition(kWriting))
        );
    }

    ngOnDestroy(): void {
        this.logger.debug(this, 'OnDestroy');
        _.each(this.subscriptions, s => s.unsubscribe());
    }
}
