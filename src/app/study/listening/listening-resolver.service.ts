/**
 * listening-resolver.service
 * getnativelearning.com
 *
 * Created by henryehly on 2017/04/29.
 */

import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import { StudySessionService } from '../../core/study-session/study-session.service';
import { HttpService } from '../../core/http/http.service';
import { APIHandle } from '../../core/http/api-handle';
import { Logger } from '../../core/logger/logger';
import { Video } from '../../core/entities/video';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ListeningResolver implements Resolve<Video> {
    constructor(private http: HttpService, private studySession: StudySessionService, private logger: Logger) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Video> {
        if (this.studySession.current.video) {
            this.logger.debug(this, 'using cached study session video:', this.studySession.current.video);
            return Observable.of(this.studySession.current.video);
        }

        this.logger.debug(this, 'no cached video present. requesting from API');
        const options = {params: {id: this.studySession.current.session.video_id}};
        return this.http.request(APIHandle.VIDEO, options).map((video: Video) => {
            this.studySession.updateCurrentSessionCache({video: video});
            return video;
        });
    }
}
