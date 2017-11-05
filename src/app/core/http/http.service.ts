///<reference path="../../../../node_modules/rxjs/Observable.d.ts"/>
/**
 * http.service
 * getnativelearning.com
 *
 * Created by henryehly on 2017/01/29.
 */

import { HttpClient, HttpErrorResponse, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Logger } from '../logger/logger';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { Entity } from '../entities/entity';
import { GNRequestOptions } from './gn-request-options';
import { APIHandle } from './api-handle';
import { APIConfig } from './api-config';
import { URIService } from './uri.service';
import { kAuthToken, kAuthTokenExpire } from '../local-storage/local-storage-keys';
import { Entities } from '../entities/entities';
import { environment } from '../../../environments/environment';
import { APIErrors } from './api-error';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import * as _ from 'lodash';

@Injectable()
export class HttpService {

    constructor(private http: HttpClient,
                private logger: Logger,
                private localStorage: LocalStorageService,
                private uriService: URIService) {
    }

    request(handle: APIHandle, options?: GNRequestOptions): Observable<Entities<Entity>|Entity> {
        if (!APIConfig.has(handle)) {
            throw new Error(`Endpoint '${handle}' not found in APIConfig.`);
        }

        const endpoint = APIConfig.get(handle);

        const req: GNRequestOptions = {
            url: environment.apiBaseUrl + endpoint.url,
            method: endpoint.method
        };

        // If the endpoint is protected, add the Authorization header.
        // If the endpoint is unprotected but kAuthToken exists, add the Authorization header anyways.
        if (endpoint.isProtected || this.localStorage.hasItem(kAuthToken)) {
            req.headers = new HttpHeaders({'Authorization': `Bearer ${this.localStorage.getItem(kAuthToken)}`});
        }

        if (options) {
            if (options.replace) {
                req.url = environment.apiBaseUrl + this.uriService.generateURIForEndpointWithParams(options.replace, endpoint);
            }

            if (options.body) {
                req.body = options.body;
            }

            if (options.params && endpoint.permitURLSearchParams) {
                options.params.keys().forEach(key => {
                    if (endpoint.permitURLSearchParams.indexOf(key) === -1) {
                        this.logger.debug(this, `Query parameter '${key}' not permitted in url ${endpoint.url}.`);
                        options.params.delete(key);
                    }
                });
                req.params = options.params;
            }
        }

        const request = new HttpRequest(req.method, req.url, {
            headers: req.headers,
            reportProgress: false,
            params: req.params,
            responseType: 'json'
        });

        this.logger.debug(this, '[REQ]', request.url, request.body);

        return this.http.request(request)
            .delay(environment.production ? 0 : _.random(3, 12) * 100)
            .map(this.handleResponse.bind(this))
            .catch(this.handleError.bind(this));
    }

    private handleResponse(response: HttpResponse<any>): Entities<Entity>|Entity {
        this.logger.debug(this, `[RES:${response.status}]`, response.url, response.body);

        if (response.headers.has('x-gn-auth-token')) {
            this.localStorage.setItem(kAuthToken, response.headers.get('x-gn-auth-token'));
        }

        if (response.headers.has('x-gn-auth-expire')) {
            this.localStorage.setItem(kAuthTokenExpire, response.headers.get('x-gn-auth-expire'));
        }

        if (_.inRange(response.status, 100, 200) || response.status === 204 || _.inRange(response.status, 300, 400)) {
            return null;
        }

        return response.body;
    }

    private handleError(response: HttpErrorResponse): Observable<APIErrors> {
        this.logger.debug(this, `[ERROR:${response.status}]`, response.url, response.message);
        let err;
        try {
            err = response.error;
        } catch (e) {
            err =  [{code: 'unknown', message: 'Failed to parse error response.'}];
        }
        return Observable.throw(err);
    }
}
