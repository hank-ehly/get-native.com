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
import { Logger } from '../logger/logger';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { Entity } from '../entities/entity';
import { GNRequestOptions } from './gn-request-options';
import { APIHandle } from './api-handle';
import { APIConfig } from './api-config';
import { URIService } from './uri.service';
import { kAuthToken, kAuthTokenExpire } from '../local-storage/local-storage-keys';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as _ from 'lodash';
import { Entities } from '../entities/entities';

@Injectable()
export class HttpService {
    constructor(private http: Http, private logger: Logger, private localStorage: LocalStorageService, private uriService: URIService) {
    }

    request(handle: APIHandle, options?: GNRequestOptions): Observable<Entities<Entity>|Entity> {
        if (!APIConfig.has(handle)) {
            throw new Error(`Endpoint '${handle}' not found in APIConfig.`);
        }

        const endpoint = APIConfig.get(handle);

        const args: RequestArgs = {
            url: Config.API + endpoint.url,
            method: endpoint.method,
            responseType: ResponseContentType.Json
        };

        if (endpoint.isProtected) {
            args.headers = new Headers({'Authorization': `Bearer ${this.localStorage.getItem(kAuthToken)}`});
        }

        if (options && options.params) {
            args.url = Config.API + this.uriService.generateURIForEndpointWithParams(options.params, endpoint);
        }

        if (options && options.body) {
            args.body = options.body;
        }

        if (options && options.search && endpoint.permitURLSearchParams) {
            options.search.paramsMap.forEach((value, key) => {
                if (endpoint.permitURLSearchParams.indexOf(key) === -1) {
                    this.logger.debug(this, `Query parameter '${key}' not permitted in url ${endpoint.url}.`);
                    options.search.paramsMap.delete(key);
                }
            });

            // todo: 'search' was deprecated. reflect naming in your own code.
            args.params = options.search;
        }

        const request = new Request(args);

        this.logger.debug(this, '[REQ]', request.url, request.getBody());

        return this.http.request(request).map(this.handleResponse.bind(this)).catch(<any>this.handleError.bind(this));
    }

    private handleResponse(response: Response): Entity {
        if (!_.inRange(response.status, 200, 400)) {
            this.handleError(response);
        }

        this.logger.debug(this, `[RES:${response.status}]`, response.url, response.json());

        if (response.headers.has('x-gn-auth-token')) {
            this.localStorage.setItem(kAuthToken, response.headers.get('x-gn-auth-token'));
        }

        if (response.headers.has('x-gn-auth-expire')) {
            this.localStorage.setItem(kAuthTokenExpire, response.headers.get('x-gn-auth-expire'));
        }

        if (_.inRange(response.status, 100, 200) || response.status === 204 || _.inRange(response.status, 300, 400)) {
            return null;
        }

        return <Entity>response.json();
    }

    private handleError(error: any) {
        if (Config.ENV === 'PROD') {
            this.logger.error(error);
        } else {
            throw new Error(error);
        }
    }
}
