/**
 * shadowing.component
 * getnativelearning.com
 *
 * Created by henryehly on 2016/12/11.
 */

import { Component, OnDestroy, OnInit } from '@angular/core';

import { StudySessionService } from '../../core/study-session/study-session.service';
import { StudySessionSection } from '../../core/typings/study-session-section';
import { Logger } from '../../core/logger/logger';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
    templateUrl: 'shadowing.component.html',
    styleUrls: ['shadowing.component.scss']
})
export class ShadowingComponent implements OnInit, OnDestroy {
    isModalPresented$ = new BehaviorSubject<boolean>(false);
    src = this.session.current.video.video_url;

    constructor(private logger: Logger, private session: StudySessionService) {
    }

    ngOnInit(): void {
        this.logger.debug(this, 'OnInit');
        this.session.startSectionTimer();
        this.session.timeLeftEmitted$.filter(time => time === 0).subscribe(() => {
            this.session.transition(StudySessionSection.Speaking);
        });
    }

    ngOnDestroy(): void {
        this.logger.debug(this, 'OnDestroy');
    }

    onClickOpenModal(): void {
        this.isModalPresented$.next(true);
    }

    onCloseModal(): void {
        this.isModalPresented$.next(false);
    }
}
