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

@Injectable()
export class ResultsResolver implements Resolve<any> {
    constructor(private http: HttpService, private session: StudySessionService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
        this.session.stopSectionTimer();
        return this.http.request(APIHandle.COMPLETE_STUDY_SESSION, {
            body: {
                id: this.session.current.session.id
            }
        }).concatMap(() => {
            return this.http.request(APIHandle.STUDY_STATS, {
                params: {
                    lang: this.session.current.video.language.code
                }
            });
        }).toPromise();
    }
}
