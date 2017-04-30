/**
 * study-session.service
 * get-native.com
 *
 * Created by henryehly on 2017/04/30.
 */

import { Injectable } from '@angular/core';

import { LocalStorageService } from '../local-storage/local-storage.service';
import { kCurrentStudySession } from '../local-storage/local-storage-keys';
import { StudySession } from '../entities/study-session';
import { NavbarService } from '../navbar/navbar.service';
import { HttpService } from '../http/http.service';
import { APIHandle } from '../http/api-handle';
import { Video } from '../entities/video';

import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import { SectionTimer } from './section-timer';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

@Injectable()
export class StudySessionService {
    progress: any = {
        listening$: this.navbar.studyProgress.listening$,
        shadowing$: this.navbar.studyProgress.shadowing$,
        speaking$:  this.navbar.studyProgress.speaking$,
        writing$:   this.navbar.studyProgress.writing$
    };

    get timer(): IntervalObservable {
        if (!this._timer && _.has(this.current, 'session.study_time')) {
            this._timer = new SectionTimer(this.current.session.study_time);
        }

        return this._timer;
    }

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

    private _timer: any = null;
    private _current: { session?: StudySession, video?: Video } = null;

    constructor(private http: HttpService, private localStorage: LocalStorageService, private navbar: NavbarService) {
    }

    start(options: StudySession): Observable<any> {
        return this.http.request(APIHandle.START_STUDY_SESSION, {body: options}).do(this.onStartStudySession.bind(this));
    }

    updateCurrent(value: any): void {
        if (!_.isPlainObject(value)) {
            return;
        }

        let current = this.current;
        _.assign(current, value);
        this.current = current;
    }

    private onStartStudySession(studySession: StudySession) {
        const session: any = {};

        session['session'] = studySession;
        session['section'] = 'listening';
        this.current = session;

        this._timer = new SectionTimer(session.session.study_time);
    }
}
