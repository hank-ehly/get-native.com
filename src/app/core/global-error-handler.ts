/**
 * global-error-handler
 * getnative.org
 *
 * Created by henryehly on 2017/11/03.
 */

import { isPlatformBrowser, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ErrorHandler, Inject, Injectable, Injector, PLATFORM_ID } from '@angular/core';

import * as _ from 'lodash';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    constructor(private injector: Injector, @Inject(PLATFORM_ID) private platformId: Object) {
    }

    handleError(error) {
        const message = this.extractMessage(error);

        const location = this.injector.get(LocationStrategy);
        const url = location instanceof PathLocationStrategy ? location.path() : '';

        if (isPlatformBrowser(this.platformId) && _.has(window, 'ga')) {
            ga('send', 'exception', {exDescription: message});
        }

        throw error;
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
}
