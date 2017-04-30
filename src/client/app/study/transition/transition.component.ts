/**
 * transition.component
 * get-native.com
 *
 * Created by henryehly on 2016/12/12.
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { StudySessionService } from '../../core/study-session/study-session.service';
import { NavbarService } from '../../core/navbar/navbar.service';
import { Logger } from '../../core/logger/logger';

import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/take';
import * as _ from 'lodash';

@Component({
    moduleId: module.id,
    selector: 'gn-transition',
    templateUrl: 'transition.component.html',
    styleUrls: ['transition.component.css']
})
export class TransitionComponent implements OnInit, OnDestroy {
    count$ = new BehaviorSubject<number>(3);
    timer  = IntervalObservable.create(1000).take(4);
    nextExercise = _.toUpper(this.studySession.current.section);

    constructor(private logger: Logger, private route: ActivatedRoute, private router: Router, private navbar: NavbarService,
                private studySession: StudySessionService) {
    }

    ngOnInit(): void {
        this.logger.debug(this, 'OnInit');
        this.timer.subscribe(this.onNext.bind(this), this.onError.bind(this), this.onComplete.bind(this));
        this.navbar.progressBarVisible$.next(true);
    }

    ngOnDestroy(): void {
        this.logger.debug(this, 'OnDestroy');
    }

    onNext(x: number): void {
        this.logger.debug(this, 'onNext', x);
        const nextCount = this.count$.getValue() - 1;

        if (_.gte(nextCount, 0)) {
            this.count$.next(nextCount);
        }
    }

    onError(): void {
        this.logger.debug(this, 'onError');
    }

    onComplete(): void {
        this.logger.debug(this, 'onComplete');
        this.router.navigate(['/study/' + this.studySession.current.section]).then(() => {
            this.logger.debug(this, 'navigate complete');
        });
    }
}
