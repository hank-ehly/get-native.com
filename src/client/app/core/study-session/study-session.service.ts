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
import { Logger } from '../logger/logger';

import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
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

    _sectionTimer: any;

    get sectionTimer(): IntervalObservable {
        this.logger.debug(this, 'trying to get section timer');
        if (this._sectionTimer) {
            this.logger.debug(this, 'returning current section timer');
            return this._sectionTimer;
        } else if (this.current && this.current.session && this.current.session.study_time) {
            this.logger.debug(this, 'initializing and returning section timer');
            this.initSectionTimer(this.current.session.study_time);
            return this._sectionTimer;
        }

        this.logger.debug(this, 'no section timer found');
        return null;
    }

    set current(value: any) {
        if (_.isPlainObject(value)) {
            this._current = value;
            this.localStorage.setItem(kCurrentStudySession, value);
        }
    }

    get current() {
        if (this._current) {
            return this._current;
        } else if (this.localStorage.hasItem(kCurrentStudySession)) {
            return this.localStorage.getItem(kCurrentStudySession);
        }

        return null;
    }

    private _current: { session?: StudySession, video?: Video };

    constructor(private http: HttpService, private localStorage: LocalStorageService, private navbar: NavbarService,
                private logger: Logger) {
    }

    start(options: { videoId: number, studyTime: number }): Observable<any> {
        return this.http.request(APIHandle.START_STUDY_SESSION, {
            body: _.mapKeys(options, function (value, key) {
                return _.snakeCase(key);
            })
        }).do(this.onStartStudySessionNext.bind(this));
    }

    updateCurrent(value: any): void {
        if (!_.isPlainObject(value)) {
            return;
        }

        let current = this.current;
        _.assign(current, value);
        this.current = current;
    }

    private onStartStudySessionNext(studySession: StudySession) {
        const session: any = {};

        session['session'] = studySession;
        session['section'] = 'listening';

        this.initSectionTimer(session.session.study_time);

        this.current = session;
    }

    private initSectionTimer(x: number) {
        this.logger.debug(this, 'initSectionTimer', x);
        const numSections = 4;
        const secondsPerSection = _.floor(x / numSections);
        this.logger.debug(this, 'seconds per section', secondsPerSection);
        this._sectionTimer = IntervalObservable.create(1000).take(secondsPerSection).map(t => {
            let secondsPassed = t + 1;
            let percentComplete = _.round((secondsPassed / secondsPerSection) * 100);
            this.logger.debug(this, `percentComplete ${percentComplete}%`);
            return percentComplete;
        });
    }
}
