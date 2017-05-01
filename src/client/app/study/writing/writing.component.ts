/**
 * writing.component
 * get-native.com
 *
 * Created by henryehly on 2016/12/11.
 */

import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Logger } from '../../core/logger/logger';

import { StudySessionService } from '../../core/study-session/study-session.service';
import { Subscription } from 'rxjs/Subscription';
import * as _ from 'lodash';

@Component({
    moduleId: module.id,
    templateUrl: 'writing.component.html',
    styleUrls: ['writing.component.css']
})
export class WritingComponent implements OnInit, OnDestroy {
    subscriptions: Subscription[] = [];

    constructor(private logger: Logger, private session: StudySessionService, private router: Router) {
    }

    ngOnInit(): void {
        this.logger.debug(this, 'OnInit');

        this.subscriptions.push(
            this.session.progressEmitted$.subscribe(this.session.progress.writingEmitted$),
            this.session.progressEmitted$.subscribe(null, null, () => this.router.navigate(['/study/results']))
        );
    }

    ngOnDestroy(): void {
        this.logger.debug(this, 'OnDestroy');
        _.each(this.subscriptions, s => s.unsubscribe());
    }
}
