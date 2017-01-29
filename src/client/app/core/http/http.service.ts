/**
 * http.service
 * get-native.com
 *
 * Created by henryehly on 2017/01/29.
 */

import { Injectable } from '@angular/core';
import { RequestArgs } from '@angular/http/src/interfaces';
import { Http, Request, Response, Headers, ResponseContentType } from '@angular/http';

import { Config } from '../../shared/config/env.config';
import { Logger, LocalStorageService, kAuthToken, kAuthTokenExpire, Entity } from '../index';
import { APIHandle, APIConfig } from './index';

import { Observable } from 'rxjs/Observable';
import '../../operators';

@Injectable()
export class HttpService {
    constructor(private http: Http, private logger: Logger, private localStorage: LocalStorageService) {
    }

    request(handle: APIHandle, options?: any): Observable<Entity> {
        if (!APIConfig.has(handle)) {
            throw new Error(`Endpoint '${handle}' not found in APIConfig.`);
        }

        let endpoint = APIConfig.get(handle);

        // Todo: Move to other service
        let matches = endpoint.url.match(/:[a-z]+/g);
        if (options && matches.length) {
            this.logger.debug(matches);
            for (let match of matches) {
                let key = match.substr(1);
                if (options[key]) {
                    endpoint.url = endpoint.url.replace(match, options[key]);
                } else {
                    throw new Error(`Could not find value for key '${key}' in options.`);
                }
            }
        }

        let args: RequestArgs = {
            url: Config.API + endpoint.url,
            method: endpoint.method,
            responseType: ResponseContentType.Json
        };

        if (options && options.body) {
            args.body = options.body;
        }

        // Todo: handle when endpoint isn't protected but token is available
        if (endpoint.isProtected) {
            let token = this.localStorage.getItem(kAuthToken);
            args.headers = new Headers();
            args.headers.set('Authorization', `Bearer ${token}`);
        }

        let request = new Request(args);

        this.logger.debug(request);

        return this.http.request(request)
            .map(this.handleResponse.bind(this))
            .catch(<Response | any>this.handleError.bind(this));
    }

    private handleResponse(response: Response): Entity {
        if (!this.between(response.status, 200, 399)) {
            this.handleError(response);
        }

        this.logger.debug(`[${this.constructor.name}] Response`, response);

        if (response.headers.has('x-gn-auth-token')) {
            this.localStorage.setItem(kAuthToken, response.headers.get('x-gn-auth-token'));
        }

        if (response.headers.has('x-gn-auth-expire')) {
            this.localStorage.setItem(kAuthTokenExpire, response.headers.get('x-gn-auth-expire'));
        }

        if ((this.between(response.status, 100, 199)) || response.status === 204 || this.between(response.status, 300, 399)) {
            return null;
        }

        return <Entity>response.json();
    }

    private handleError(error: Response | any) {
        throw new Error(error);
    }

    private between(num: number, lowerLimit: number, upperLimit: number) {
        return num >= lowerLimit && num <= upperLimit;
    }
}
