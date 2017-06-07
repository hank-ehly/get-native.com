/**
 * shadowing.component
 * get-native.com
 *
 * Created by henryehly on 2016/12/11.
 */

import { Component, OnDestroy, OnInit } from '@angular/core';

import { StudySessionService } from '../../core/study-session/study-session.service';
import { kSpeaking } from '../../core/study-session/section-keys';
import { Logger } from '../../core/logger/logger';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import * as _ from 'lodash';

@Component({
    templateUrl: 'shadowing.component.html',
    styleUrls: ['shadowing.component.scss']
})
export class ShadowingComponent implements OnInit, OnDestroy {
    modalVisibility$ = new BehaviorSubject<boolean>(false);
    src = this.session.current.video.video_url;

    subscriptions: Subscription[] = [];

    constructor(private logger: Logger, private session: StudySessionService) {
    }

    ngOnInit(): void {
        this.logger.debug(this, 'OnInit');

        this.subscriptions.push(
            this.session.progressEmitted$.subscribe(this.session.progress.shadowingEmitted$), // todo: this needs to be reset
            this.session.progressEmitted$.subscribe(null, null, () => this.session.transition(kSpeaking))
        );
    }

    ngOnDestroy(): void {
        this.logger.debug(this, 'OnDestroy');
        _.each(this.subscriptions, s => s.unsubscribe());
    }
}
