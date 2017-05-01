/**
 * listening.component
 * get-native.com
 *
 * Created by henryehly on 2016/12/11.
 */

import { Component, OnDestroy, OnInit } from '@angular/core';

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

    constructor(private logger: Logger, private studySession: StudySessionService) {
    }

    ngOnInit(): void {
        this.logger.debug(this, 'OnInit');
    }

    ngOnDestroy(): void {
        this.logger.debug(this, 'OnDestroy');
    }
}
