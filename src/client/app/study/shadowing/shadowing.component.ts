/**
 * shadowing.component
 * get-native.com
 *
 * Created by henryehly on 2016/12/11.
 */

import { Component, OnDestroy, OnInit } from '@angular/core';

import { Logger } from '../../core/logger/logger';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { StudySessionService } from '../../core/study-session/study-session.service';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    templateUrl: 'shadowing.component.html',
    styleUrls: ['shadowing.component.css']
})
export class ShadowingComponent implements OnInit, OnDestroy {
    modalVisibility$ = new BehaviorSubject<boolean>(false);

    src: string;

    constructor(private logger: Logger, private studySession: StudySessionService, private router: Router) {
        this.src = this.studySession.current.video.video_url;
    }

    ngOnInit() {
        this.logger.debug(this, 'OnInit');
        this.studySession.sectionTimer.subscribe(this.studySession.progress.shadowing$);
        this.studySession.sectionTimer.subscribe(null, null, this.onComplete.bind(this));
    }

    ngOnDestroy(): void {
        this.logger.debug(this, 'OnDestroy');
    }

    onComplete(): void {
        this.studySession.updateCurrent({section: 'speaking'});
        this.router.navigate(['/study']).then(() => {
            this.logger.debug(this, 'navigated to /study');
        });
    }
}
