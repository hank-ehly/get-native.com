/**
 * speaking.component
 * get-native.com
 *
 * Created by henryehly on 2016/12/11.
 */

import { Component, OnDestroy, OnInit } from '@angular/core';

import { StudySessionService } from '../../core/study-session/study-session.service';
import { Transcripts } from '../../core/entities/transcripts';
import { Logger } from '../../core/logger/logger';

@Component({
    moduleId: module.id,
    templateUrl: 'speaking.component.html',
    styleUrls: ['speaking.component.css']
})
export class SpeakingComponent implements OnInit, OnDestroy {
    transcripts: Transcripts = this.studySession.current.video.transcripts;

    constructor(private logger: Logger, private studySession: StudySessionService) {
    }

    ngOnInit() {
        this.logger.debug(this, 'OnInit');
    }

    ngOnDestroy(): void {
        this.logger.debug(this, 'OnDestroy');
    }
}
