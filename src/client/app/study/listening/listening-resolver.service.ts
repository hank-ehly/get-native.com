/**
 * listening-resolver.service
 * get-native.com
 *
 * Created by henryehly on 2017/04/29.
 */

import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import { HttpService } from '../../core/http/http.service';
import { APIHandle } from '../../core/http/api-handle';
import { Video } from '../../core/entities/video';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ListeningResolver implements Resolve<Video> {
    constructor(private http: HttpService) {
    }


    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Video> {
        return this.http.request(APIHandle.VIDEO, {
            params: {
                id: route.queryParams['v']
            }
        }).map((video: Video) => {
            return video;
        }).toPromise().catch(() => {
            return null;
        });
    }
}
