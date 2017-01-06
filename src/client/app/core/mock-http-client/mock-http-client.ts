/**
 * mock-http-client
 * get-native.com
 *
 * Created by henryehly on 2016/12/24.
 */

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Logger, Video } from '../index';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class MockHTTPClient {
    baseUrl: string = 'app/core/mock-http-client';

    constructor(private logger: Logger, private http: Http) {
    }

    getVideosShowId(id: number): Observable<Video> {
        return this.http
            .get(`${this.baseUrl}/video.json`)
            .map((r: Response) => <Video>r.json());
    }
}
