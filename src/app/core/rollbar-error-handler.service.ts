import { ErrorHandler, Injectable, Injector } from '@angular/core';

import * as Rollbar from 'rollbar';

export function rollbarFactory() {
    return new Rollbar({
        accessToken: 'd924194b4e9d4a36b9c8954a2af303f6',
        captureUncaught: true,
        captureUnhandledRejections: true,
    });
}

@Injectable()
export class RollbarErrorHandler implements ErrorHandler {
    rollbar: any;

    constructor(private injector: Injector) {
        this.rollbar = injector.get(Rollbar);
    }

    handleError(err: any): void {
        console.log(err);
        this.rollbar.error(err.originalError || err);
    }
}
