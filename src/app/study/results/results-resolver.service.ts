/**
 * results-resolver.service
 * getnativelearning.com
 *
 * Created by henryehly on 2017/05/01.
 */

import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import { StudySessionService } from '../../core/study-session/study-session.service';
import { HttpService } from '../../core/http/http.service';
import { APIHandle } from '../../core/http/api-handle';

import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { Logger } from '../../core/logger/logger';
import * as _ from 'lodash';

@Injectable()
export class ResultsResolver implements Resolve<any> {

    constructor(private http: HttpService, private session: StudySessionService, private logger: Logger) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        this.session.stopSectionTimer();

        if (this.session.current.session.is_completed && this.session.current.stats) {
            this.logger.debug(this, 'session is already complete');
            return Observable.of(this.session.current.stats);
        }

        const completeStudySessionOptions = {
            body: {
                id: this.session.current.session.id
            }
        };

        const studyStatsOptions = {
            replace: {
                lang: this.session.current.video.language.code
            }
        };

        return this.http.request(APIHandle.COMPLETE_STUDY_SESSION, completeStudySessionOptions).concatMap(() => {
            const updatedSessionObject = _.assign(this.session.current.session, {is_completed: true});
            this.session.updateCurrentSessionCache({session: updatedSessionObject});
            return this.http.request(APIHandle.STUDY_STATS, studyStatsOptions).map((stats: any) => {
                this.session.updateCurrentSessionCache({stats: stats});
                return stats;
            });
        });
    }

}
