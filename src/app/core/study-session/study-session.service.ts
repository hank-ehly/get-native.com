/**
 * study-session.service
 * get-native.com
 *
 * Created by henryehly on 2017/04/30.
 */

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { StudySessionLocalStorageObject } from './study-session-local-storage-object';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { kListening, kShadowing, kSpeaking, kWriting } from './section-keys';
import { kCurrentStudySession } from '../local-storage/local-storage-keys';
import { StudySessionSectionTimer } from './study-session-section-timer';
import { StudySessionSection } from '../typings/study-session-section';
import { NavbarService } from '../navbar/navbar.service';
import { StudySession } from '../entities/study-session';
import { HttpService } from '../http/http.service';
import { APIHandle } from '../http/api-handle';
import { Logger } from '../logger/logger';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import * as _ from 'lodash';

@Injectable()
export class StudySessionService {
    set current(value: any) {
        if (!_.isPlainObject(value)) {
            return;
        }

        this._current = value;
        this.localStorage.setItem(kCurrentStudySession, value);
    }

    get current() {
        if (!this._current && this.localStorage.hasItem(kCurrentStudySession)) {
            return this.localStorage.getItem(kCurrentStudySession);
        }

        return this._current;
    }

    get progressEmitted$(): Observable<number> {
        if (!this._progressEmitted$ && _.has(this.current, 'session.study_time')) {
            this._progressEmitted$ = new StudySessionSectionTimer(this.current.session.study_time);
        }

        return this._progressEmitted$.share();
    }

    get nextSection(): StudySessionSection {
        let nextSection: StudySessionSection;

        if (this.current.section === kListening) {
            nextSection = kShadowing;
        } else if (this.current.section === kShadowing) {
            nextSection = kSpeaking;
        } else {
            nextSection = kWriting;
        }

        return nextSection;
    }

    progress = this.navbar.progress;

    private _progressEmitted$: Observable<number>    = null;
    private _current: StudySessionLocalStorageObject = null;
    private _countdown: NodeJS.Timer;

    constructor(private http: HttpService, private localStorage: LocalStorageService, private logger: Logger, private router: Router,
                private navbar: NavbarService) {
    }

    create(options: StudySession): Observable<any> {
        return this.http.request(APIHandle.START_STUDY_SESSION, {body: options}).do(this.onStartStudySession.bind(this));
    }

    transition(section: StudySessionSection) {
        this.updateCurrent({
            section: section
        });

        this.router.navigate(['/study']).then(() => {
            this.logger.debug(this, 'navigated to /study');
        });
    }

    updateCurrent(value: any): void {
        if (!_.isPlainObject(value)) {
            return;
        }

        const current = this.current;
        _.assign(current, value);
        this.current = current;
    }

    startCountdown(): void {
        this.logger.debug(this, 'startCountdown');
        let seconds = _.floor(this.current.session.study_time / 4);

        seconds--;
        this.progress.countdownEmitted$.next(seconds);

        this._countdown = setInterval(() => {
            seconds--;

            if (seconds === 0) {
                clearInterval(this._countdown);
                return;
            }

            this.progress.countdownEmitted$.next(seconds);
        }, 1000);
    }

    resetCountdown(): void {
        clearInterval(this._countdown);
        const sectionTime = _.floor(this.current.session.study_time / 4);
        this.logger.debug(this, 'resetCountdown', sectionTime);
        this.progress.countdownEmitted$.next(sectionTime);
    }

    end(): void {
        this.resetCountdown();
        _.invokeMap(this.progress, 'next', 0);
    }

    private onStartStudySession(studySession: StudySession) {
        const session: any = {};

        session.session = studySession;
        this.current = session;

        this._progressEmitted$ = new StudySessionSectionTimer(session.session.study_time);
    }
}
