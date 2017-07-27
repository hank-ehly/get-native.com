/**
 * listening-resolver.service
 * get-native.com
 *
 * Created by henryehly on 2017/04/29.
 */

import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import { StudySessionService } from '../../core/study-session/study-session.service';
import { HttpService } from '../../core/http/http.service';
import { APIHandle } from '../../core/http/api-handle';
import { Video } from '../../core/entities/video';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ListeningResolver implements Resolve<Video> {
    constructor(private http: HttpService, private studySession: StudySessionService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Video> {
        // todo: if you refresh, you still send another request for the video. Couldn't you instead use the cache?
        // consider: you may have previously saved data?
        return this.http.request(APIHandle.VIDEO, {
            params: {
                id: this.studySession.current.session.video_id
            }
        }).map((video: Video) => {
            this.studySession.updateCurrent({video: video});
            return video;
        }).toPromise();
    }
}
