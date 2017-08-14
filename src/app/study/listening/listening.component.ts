/**
 * listening.component
 * getnativelearning.com
 *
 * Created by henryehly on 2016/12/11.
 */

import { Component, OnDestroy, OnInit } from '@angular/core';

import { StudySessionService } from '../../core/study-session/study-session.service';
import { kShadowing } from '../../core/study-session/section-keys';
import { Logger } from '../../core/logger/logger';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

@Component({
    templateUrl: 'listening.component.html',
    styleUrls: ['listening.component.scss']
})
export class ListeningComponent implements OnInit, OnDestroy {

    transcripts = this.session.current.video.transcripts;
    src = this.session.current.video.video_url;
    OnDestroy$ = new Subject<void>();

    constructor(private logger: Logger, private session: StudySessionService) {
    }

    ngOnInit(): void {
        this.logger.debug(this, 'OnInit');
        this.session.progressEmitted$.takeUntil(this.OnDestroy$).subscribe(this.session.progress.listeningEmitted$);
        this.session.progressEmitted$.takeUntil(this.OnDestroy$).subscribe(null, null, () => this.session.transition(kShadowing));
    }

    ngOnDestroy(): void {
        this.logger.debug(this, 'OnDestroy');
        this.OnDestroy$.next();
    }

}
