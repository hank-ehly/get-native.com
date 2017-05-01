/**
 * transition.component
 * get-native.com
 *
 * Created by henryehly on 2016/12/12.
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { kListening, kShadowing, kSpeaking, kWriting } from '../../core/study-session/section-keys';
import { StudySessionService } from '../../core/study-session/study-session.service';
import { Logger } from '../../core/logger/logger';

import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/switch';
import 'rxjs/add/operator/take';
import 'rxjs/observable/never';
import * as _ from 'lodash';

@Component({
    moduleId: module.id,
    selector: 'gn-transition',
    templateUrl: 'transition.component.html',
    styleUrls: ['transition.component.css']
})
export class TransitionComponent implements OnInit, OnDestroy {
    transitionTimer  = TimerObservable.create(0, 1000).take(4);
    exercise         = _.toUpper(this.session.current.section);
    count$           = new BehaviorSubject<number>(3);

    subscriptions: Subscription[] = [];

    constructor(private logger: Logger, private router: Router, private session: StudySessionService) {
    }

    ngOnInit(): void {
        this.logger.debug(this, 'OnInit');
        this.subscriptions.push(this.transitionTimer.subscribe(this.onNext.bind(this), null, this.onComplete.bind(this)));
        this.session.resetCountdown();
    }

    ngOnDestroy(): void {
        this.logger.debug(this, 'OnDestroy');
        _.each(this.subscriptions, s => s.unsubscribe());
    }

    onNext(x: number): void {
        this.logger.debug(this, 'onNext', x);
        const nextCount = this.count$.getValue() - 1;
        if (_.gte(nextCount, 0)) {
            this.count$.next(nextCount);
        }
    }

    onComplete(): void {
        this.logger.debug(this, 'onComplete');
        this.router.navigate(['/study/' + this.session.current.section]).then(() => {
            this.session.startCountdown();
        });
    }
}
