/**
 * global-error-handler
 * getnative.org
 *
 * Created by henryehly on 2017/11/03.
 */

import { isPlatformBrowser, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ErrorHandler, Inject, Injectable, Injector, PLATFORM_ID } from '@angular/core';

import * as _ from 'lodash';
import { HttpService } from './http/http.service';
import { APIHandle } from './http/api-handle';
import { HttpParams } from '@angular/common/http';
import { Logger } from './logger/logger';
import { GNRequestOptions } from './http/gn-request-options';

@Injectable()
export class GlobalErrorHandler extends ErrorHandler {

    constructor(@Inject(PLATFORM_ID) private platformId: Object, private http: HttpService, private logger: Logger) {
        super();
    }

    handleError(error) {
        const message = this.extractMessage(error);

        if (isPlatformBrowser(this.platformId) && _.has(window, 'ga')) {
            ga('send', 'exception', {exDescription: message});
        }

        // this.logToStackDriver(error);

        super.handleError(error);
    }

    private extractMessage(error): string {
        let message;

        if (error.message && _.isString(error.message)) {
            message = error.message;
        } else if (_.isArray(error) && _.has(error, '[0].message') && _.isString(error[0].message)) {
            message = error[0].message;
        } else {
            message = error.toString();
        }

        return message;
    }

    private logToStackDriver(error) {
        if (!_.isError(error)) {
            return;
        }

        const url = 'https://clouderrorreporting.googleapis.com/v1beta1/projects/get-native/events:report?key=';

        const body = {
            message: error.stack
        };

        if (isPlatformBrowser(this.platformId)) {
            body['context'] = {
                httpRequest: {
                    method: 'GET',
                    url: window.location.href,
                    userAgent: window.navigator.userAgent
                }
            };
        }

        const options: GNRequestOptions = {
            method: 'POST',
            url: url,
            body: body
        };

        this.http.requestBasic(options).subscribe(() => {
            this.logger.debug(this, 'Logged error to StackDriver');
        }, (e) => {
            this.logger.debug(this, 'Failed to log error to StackDriver', e);
        });
    }
}
