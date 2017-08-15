/**
 * speaking.component
 * getnativelearning.com
 *
 * Created by henryehly on 2016/12/11.
 */

import { Component, OnDestroy, OnInit } from '@angular/core';

import { StudySessionService } from '../../core/study-session/study-session.service';
import { StudySessionSection } from '../../core/typings/study-session-section';
import { Transcript } from '../../core/entities/transcript';
import { Entities } from '../../core/entities/entities';
import { Logger } from '../../core/logger/logger';

@Component({
    templateUrl: 'speaking.component.html',
    styleUrls: ['speaking.component.scss']
})
export class SpeakingComponent implements OnInit, OnDestroy {

    transcripts: Entities<Transcript> = this.session.current.video.transcripts;

    constructor(private logger: Logger, private session: StudySessionService) {
    }

    ngOnInit(): void {
        this.logger.debug(this, 'OnInit');
        this.session.startSectionTimer();
        this.session.timeLeftEmitted$.filter(time => time === 0).subscribe(() => {
            this.session.transition(StudySessionSection.Writing);
        });
    }

    ngOnDestroy(): void {
        this.logger.debug(this, 'OnDestroy');
    }

}
