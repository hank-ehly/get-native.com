/**
 * http.service
 * get-native.com
 *
 * Created by henryehly on 2017/01/29.
 */

import { Injectable } from '@angular/core';
import { Http, Request, Response, ResponseContentType, Headers } from '@angular/http';
import { RequestArgs } from '@angular/http/src/interfaces';

import { Config } from '../../shared/config/env.config';
import { Logger, LocalStorageService, kAuthToken, kAuthTokenExpire, Entity } from '../index';
import { APIHandle, APIConfig, URIService, GNRequestOptions } from './index';

import { Observable } from 'rxjs/Observable';
import '../../operators';

@Injectable()
export class HttpService {
    constructor(private http: Http, private logger: Logger, private localStorage: LocalStorageService, private uriService: URIService) {
    }

    request(handle: APIHandle, options?: GNRequestOptions): Observable<Entity> {
        if (!APIConfig.has(handle)) {
            throw new Error(`Endpoint '${handle}' not found in APIConfig.`);
        }

        let endpoint = APIConfig.get(handle);

        let args: RequestArgs = {url: Config.API + endpoint.url, method: endpoint.method, responseType: ResponseContentType.Json};

        if (endpoint.isProtected) {
            args.headers = new Headers({'Authorization': `Bearer ${this.localStorage.getItem(kAuthToken)}`});
        }

        if (options) { // move to another function for processing options
            if (options.params) {
                args.url = Config.API + this.uriService.generateURIForEndpointWithParams(options.params, endpoint);
            }

            if (options.body) args.body = options.body;

            if (options.search && endpoint.permitURLSearchParams) {
                options.search.paramsMap.forEach((value, key) => {
                    if (endpoint.permitURLSearchParams.indexOf(key) === -1) {
                        this.logger.debug(`[${this.constructor.name}] Query parameter '${key}' not permitted in url ${endpoint.url}.`);
                        options.search.paramsMap.delete(key);
                    }
                });
            }
        }

        let request = new Request(args);

        this.logger.debug(request);

        return this.http.request(request)
            .map(this.handleResponse.bind(this))
            .catch(<Response|any>this.handleError.bind(this));
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

    // Todo: Move to service
    private between(num: number, lowerLimit: number, upperLimit: number) {
        return num >= lowerLimit && num <= upperLimit;
    }
}
