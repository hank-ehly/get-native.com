/**
 * study-progress.component
 * getnative.org
 *
 * Created by henryehly on 2016/12/13.
 */

import { Component, OnDestroy, OnInit } from '@angular/core';

import { StudySessionService } from '../../core/study-session/study-session.service';
import { StudySessionSection } from '../../core/typings/study-session-section';
import { Logger } from '../../core/logger/logger';

import { Subject } from 'rxjs/Subject';
import * as _ from 'lodash';

@Component({
    selector: 'gn-study-progress',
    templateUrl: 'study-progress.component.html',
    styleUrls: ['study-progress.component.scss']
})
export class StudyProgressComponent implements OnInit, OnDestroy {

    OnDestroy$ = new Subject<void>();
    section = StudySessionSection;
    sectionTime: number;
    timeLeft: number;

    constructor(private logger: Logger, private session: StudySessionService) {
        this.sectionTime = _.floor(this.session.current.session.study_time / 4);
        this.timeLeft = this.session.isComplete ? 0 : this.sectionTime;
    }

    ngOnInit(): void {
        this.logger.debug(this, 'OnInit');

        this.session.timeLeftEmitted$.takeUntil(this.OnDestroy$).subscribe((timeLeft) => {
            this.timeLeft = timeLeft;
        });
    }

    ngOnDestroy(): void {
        this.logger.debug(this, 'OnDestroy');
        this.OnDestroy$.next();
    }

    progressForSection(section: StudySessionSection): number {
        if (section === this.session.current.section) {
            return this.currentSectionProgress();
        }

        if (section < this.session.current.section) {
            return 100;
        }

        return 0;
    }

    isComplete(section: StudySessionSection): boolean {
        return this.session.isComplete ? true : this.progressForSection(section) === 100;
    }

    private currentSectionProgress(): number {
        return this.session.isComplete ? 100 : 100 - ((this.timeLeft / this.sectionTime) * 100);
    }

}
