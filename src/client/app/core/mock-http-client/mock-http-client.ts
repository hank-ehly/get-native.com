/**
 * mock-http-client
 * get-native.com
 *
 * Created by henryehly on 2016/12/24.
 */

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Logger, Video, Videos, Categories, CuedVideos, User } from '../index';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class MockHTTPClient {
    baseUrl: string = 'http://localhost:3000';

    constructor(private logger: Logger, private http: Http) {
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
}
