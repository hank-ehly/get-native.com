/**
 * results-resolver.service
 * get-native.com
 *
 * Created by henryehly on 2017/05/01.
 */

import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import { StudySessionService } from '../../core/study-session/study-session.service';
import { HttpService } from '../../core/http/http.service';
import { APIHandle } from '../../core/http/api-handle';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mapTo';

@Injectable()
export class ResultsResolver implements Resolve<void> { // todo: you'll need to resolve with stats
    constructor(private http: HttpService, private session: StudySessionService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<void> {
        return this.http.request(APIHandle.COMPLETE_STUDY_SESSION, {
            body: {
                id: this.session.current.session.id
            }
        }).mapTo(null).toPromise().then(() => {
            this.session.end();
        });
    }
}
