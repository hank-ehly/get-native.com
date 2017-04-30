/**
 * speaking.component
 * get-native.com
 *
 * Created by henryehly on 2016/12/11.
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StudySessionService } from '../../core/study-session/study-session.service';
import { Logger } from '../../core/logger/logger';
import { Transcripts } from '../../core/entities/transcripts';

@Component({
    moduleId: module.id,
    templateUrl: 'speaking.component.html',
    styleUrls: ['speaking.component.css']
})
export class SpeakingComponent implements OnInit, OnDestroy {
    transcripts: Transcripts = this.studySession.current.video.transcripts;

    constructor(private logger: Logger, private router: Router, private studySession: StudySessionService) {
    }

    ngOnInit() {
        this.logger.debug(this, 'OnInit');
        this.studySession.sectionTimer.subscribe(this.studySession.progress.speaking$);
        this.studySession.sectionTimer.subscribe(null, null, this.onComplete.bind(this));
    }

    ngOnDestroy(): void {
        this.logger.debug(this, 'OnDestroy');
    }

    onComplete(): void {
        this.studySession.updateCurrent({section: 'writing'});
        this.router.navigate(['/study']).then(() => {
            this.logger.debug(this, 'navigated to /study');
        });
    }
}
