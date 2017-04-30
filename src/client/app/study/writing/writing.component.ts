/**
 * writing.component
 * get-native.com
 *
 * Created by henryehly on 2016/12/11.
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StudySessionService } from '../../core/study-session/study-session.service';
import { Logger } from '../../core/logger/logger';

@Component({
    moduleId: module.id,
    templateUrl: 'writing.component.html',
    styleUrls: ['writing.component.css']
})
export class WritingComponent implements OnInit {
    constructor(private logger: Logger, private router: Router, private studySession: StudySessionService) {
    }

    ngOnInit() {
        this.logger.debug(this, 'OnInit');
        this.studySession.sectionTimer.subscribe(this.studySession.progress.writing$);
        this.studySession.sectionTimer.subscribe(null, null, this.onComplete.bind(this));
    }

    onComplete(): void {
        this.router.navigate(['/study/results']).then(() => {
            this.logger.debug(this, 'navigated to /study/results');
        });
    }
}
