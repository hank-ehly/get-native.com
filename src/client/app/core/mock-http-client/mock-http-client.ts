/**
 * mock-http-client
 * get-native.com
 *
 * Created by henryehly on 2016/12/24.
 */

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Logger } from '../index';
import { VideosShowId } from '../resources/videos-show-id';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class MockHTTPClient {
    baseUrl: string = 'app/core/mock-api';

    constructor(private logger: Logger, private http: Http) {
    }

    getVideosShowId(id: number): Observable<VideosShowId> {
        return this.http
            .get(`${this.baseUrl}/videos-show-id.json`)
            .map((r: Response) => <VideosShowId>r.json()['data']);
    }
}
