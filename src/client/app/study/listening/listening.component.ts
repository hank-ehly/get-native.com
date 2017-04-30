/**
 * listening.component
 * get-native.com
 *
 * Created by henryehly on 2016/12/11.
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { StudySessionService } from '../../core/study-session/study-session.service';
import { Transcripts } from '../../core/entities/transcripts';
import { Logger } from '../../core/logger/logger';

import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/take';

@Component({
    moduleId: module.id,
    templateUrl: 'listening.component.html',
    styleUrls: ['listening.component.css']
})
export class ListeningComponent implements OnInit, OnDestroy {
    transcripts: Transcripts = this.studySession.current.video.transcripts;
    src: string = this.studySession.current.video.video_url;

    constructor(private logger: Logger, private studySession: StudySessionService, private router: Router) {
    }

    ngOnInit(): void {
        this.logger.debug(this, 'OnInit');
        this.studySession.timer.subscribe(this.studySession.progress.listening$);
        this.studySession.timer.subscribe(null, null, this.onComplete.bind(this));
    }

    ngOnDestroy(): void {
        this.logger.debug(this, 'OnDestroy');
    }

    onComplete(): void {
        this.logger.debug(this, 'onComplete');
        this.studySession.updateCurrent({section: 'shadowing'});
        this.router.navigate(['/study']).then(() => {
            this.logger.debug(this, 'navigated to /study');
        });
    }
}
