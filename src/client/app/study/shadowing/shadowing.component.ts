/**
 * shadowing.component
 * get-native.com
 *
 * Created by henryehly on 2016/12/11.
 */

import { Component, OnDestroy, OnInit } from '@angular/core';

import { StudySessionService } from '../../core/study-session/study-session.service';
import { Logger } from '../../core/logger/logger';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
    moduleId: module.id,
    templateUrl: 'shadowing.component.html',
    styleUrls: ['shadowing.component.css']
})
export class ShadowingComponent implements OnInit, OnDestroy {
    modalVisibility$ = new BehaviorSubject<boolean>(false);
    src = this.studySession.current.video.video_url;

    constructor(private logger: Logger, private studySession: StudySessionService) {
    }

    ngOnInit() {
        this.logger.debug(this, 'OnInit');
    }

    ngOnDestroy(): void {
        this.logger.debug(this, 'OnDestroy');
    }
}
