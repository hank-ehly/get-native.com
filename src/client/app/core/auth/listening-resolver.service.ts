/**
 * listening-resolver.service
 * get-native.com
 *
 * Created by henryehly on 2017/04/29.
 */

import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import { HttpService } from '../http/http.service';
import { APIHandle } from '../http/api-handle';
import { Video } from '../entities/video';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ListeningResolver implements Resolve<Video> {
    constructor(private http: HttpService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Video> {
        return this.http.request(APIHandle.START_STUDY_SESSION, {
            body: {
                video_id: route.queryParams['v'],
                time: 600
            }
        }).map((video: Video) => {
            return video;
        }).toPromise().catch(() => {
            // todo: what should you do when the request to create a new study session fails
            return null;
        });
    }
}
