/**
 * mock-http-client
 * get-native.com
 *
 * Created by henryehly on 2016/12/24.
 */

import { Injectable } from '@angular/core';
import { Http, Response, RequestOptionsArgs, Headers } from '@angular/http';

import { Video, Videos, Categories, CuedVideos, Logger } from '../index';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class MockHTTPClient {
    baseUrl: string = 'http://localhost:3000';

    constructor(private http: Http, private logger: Logger) {
    }

    GET_video(id: number): Observable<Video> {
        return this.http.get(`${this.baseUrl}/videos/${id}`).map((r: Response) => <Video>r.json());
    }

    GET_videos(): Observable<Videos> {
        return this.http.get(`${this.baseUrl}/videos`).map((r: Response) => <Videos>r.json());
    }

    GET_categories(): Observable<Categories> {
        return this.http.get(`${this.baseUrl}/categories`).map((r: Response) => <Categories>r.json());
    }

    GET_cued_videos(): Observable<CuedVideos> {
        return this.http.get(`${this.baseUrl}/cued_videos`).map((r: Response) => <CuedVideos>r.json());
    }

    GET_study_stats(): Observable<any> {
        return this.http.get(`${this.baseUrl}/study_stats`).map((r: Response) => <any>r.json());
    }

    POST_login(credentials: any): Observable<any> {
        let headers = new Headers();

        headers.set('Content-Type', 'application/json');


        let options: RequestOptionsArgs = {
            headers: headers
        };

        return this.http.post(`${this.baseUrl}/login`, JSON.stringify(credentials), options).map((r: Response) => {
            this.logger.debug('Received login response: ', r);

            /* got it! */
            this.logger.info('Auth header', r.headers.get('x-gn-auth-token'));

            return <any>r.json();
        });
    }
}
