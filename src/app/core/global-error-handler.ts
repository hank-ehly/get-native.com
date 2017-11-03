/**
 * global-error-handler
 * getnativelearning.com
 *
 * Created by henryehly on 2017/11/03.
 */

import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ErrorHandler, Injectable, Injector } from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    constructor(private injector: Injector) {
    }

    handleError(error) {
        const message = error.message ? error.message : error.toString();

        const location = this.injector.get(LocationStrategy);
        const url = location instanceof PathLocationStrategy ? location.path() : '';

        ga('send', 'exception', {exDescription: message});

        throw error;
    }
}
