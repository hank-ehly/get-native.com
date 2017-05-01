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
    transitionTimer  = IntervalObservable.create(1000).take(4);
    exercise         = _.toUpper(this.session.current.section);
    count$           = new BehaviorSubject<number>(3);

    constructor(private logger: Logger, private router: Router, private navbar: NavbarService, private session: StudySessionService) {
    }

    ngOnInit(): void {
        this.logger.debug(this, 'OnInit');
        this.transitionTimer.subscribe(this.onNext.bind(this), this.onError.bind(this), this.onComplete.bind(this));
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
        const path = '/study/' + this.session.current.section;
        this.router.navigate([path]).then(() => {
            this.logger.debug(this, `navigated to ${path}`);
            switch (this.session.current.section) {
                case kListening:
                    this.session.progressEmitted$.subscribe(this.session.progress.listeningEmitted$);
                    this.session.progressEmitted$.subscribe(null, null, () => this.session.transition(kShadowing));
                    break;
                case kShadowing:
                    this.session.progressEmitted$.subscribe(this.session.progress.shadowingEmitted$);
                    this.session.progressEmitted$.subscribe(null, null, () => this.session.transition(kSpeaking));
                    break;
                case kSpeaking:
                    this.session.progressEmitted$.subscribe(this.session.progress.speakingEmitted$);
                    this.session.progressEmitted$.subscribe(null, null, () => this.session.transition(kWriting));
                    break;
                case kWriting:
                    this.session.progressEmitted$.subscribe(this.session.progress.writingEmitted$);
                    this.session.progressEmitted$.subscribe(null, null, () => this.router.navigate(['/study/results']));
                    break;
                default:
                    break;
            }
            this.session.sectionCountdownEmitted$.subscribe(this.session.progress.countdownEmitted$);
        });
    }
}
