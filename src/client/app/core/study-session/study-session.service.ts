/**
 * study-session.service
 * get-native.com
 *
 * Created by henryehly on 2017/04/30.
 */

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { LocalStorageService } from '../local-storage/local-storage.service';
import { kCurrentStudySession } from '../local-storage/local-storage-keys';
import { StudySessionSectionTimer } from './study-session-section-timer';
import { StudySessionSection } from '../typings/study-session-section';
import { NavbarService } from '../navbar/navbar.service';
import { StudySession } from '../entities/study-session';
import { HttpService } from '../http/http.service';
import { APIHandle } from '../http/api-handle';
import { Logger } from '../logger/logger';
import { Video } from '../entities/video';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import * as _ from 'lodash';

interface StudySessionLocalStorageObject {
    session?: StudySession;
    video?: Video;
}

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

    progress = this.navbar.progress;

    private _progressEmitted$: Observable<number>    = null;
    private _current: StudySessionLocalStorageObject = null;

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

        let current = this.current;
        _.assign(current, value);
        this.current = current;
    }

    startCountdown(): void {
        this.logger.debug(this, 'startCountdown');
        let currentInterval = _.floor(this.current.session.study_time / 4);

        currentInterval--;
        this.progress.countdownEmitted$.next(currentInterval);

        let interval = setInterval(() => {
            currentInterval--;

            if (currentInterval === 0) {
                clearInterval(interval);
                return;
            }

            this.progress.countdownEmitted$.next(currentInterval);
        }, 1000);
    }

    resetCountdown(): void {
        const sectionTime = _.floor(this.current.session.study_time / 4);
        this.logger.debug(this, 'resetCountdown', sectionTime);
        this.progress.countdownEmitted$.next(sectionTime);
    }

    end(): void {
        this.resetCountdown();
        _.each(this.progress, (o: BehaviorSubject<number>) => o.next(0));
        this.localStorage.removeItem(kCurrentStudySession);
    }

    private onStartStudySession(studySession: StudySession) {
        const session: any = {};

        session.session = studySession;
        this.current = session;

        this._progressEmitted$ = new StudySessionSectionTimer(session.session.study_time);
    }
}
