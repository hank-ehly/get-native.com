/**
 * mock-http-client
 * get-native.com
 *
 * Created by henryehly on 2016/12/24.
 */

import { Injectable } from '@angular/core';
import { Http, Response, RequestOptionsArgs, Headers } from '@angular/http';

import { Video, Videos, Categories, CuedVideos, Logger } from '../index';
import { Config } from '../../shared/config/env.config';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class MockHTTPClient {
    base: string = Config.API;

    constructor(private http: Http, private logger: Logger) {
    }

    GET_video(id: number): Observable<Video> {
        return this.http.get(`${this.base}/videos/${id}`).map((r: Response) => <Video>r.json());
    }

    GET_videos(): Observable<Videos> {
        return this.http.get(`${this.base}/videos`).map((r: Response) => <Videos>r.json());
    }

    GET_categories(): Observable<Categories> {
        return this.http.get(`${this.base}/categories`).map((r: Response) => <Categories>r.json());
    }

    GET_cued_videos(): Observable<CuedVideos> {
        return this.http.get(`${this.base}/cued_videos`).map((r: Response) => <CuedVideos>r.json());
    }

    GET_study_stats(): Observable<any> {
        return this.http.get(`${this.base}/study/stats`).map((r: Response) => <any>r.json());
    }

    POST_login(credentials: any): Observable<any> {
        let headers = new Headers();

        headers.set('Content-Type', 'application/json');


        let options: RequestOptionsArgs = {
            headers: headers
        };

        return this.http.post(`${this.base}/login`, JSON.stringify(credentials), options).map((r: Response) => {
            this.logger.debug('Received login response: ', r);

            /* got it! */
            this.logger.info('Auth header', r.headers.get('x-gn-auth-token'));

            return <any>r.json();
        });
    }
}
