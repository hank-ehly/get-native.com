import { ErrorHandler, Injectable, InjectionToken, Injector } from '@angular/core';

import * as Rollbar from 'rollbar';
import { environment } from '../../environments/environment';

export function rollbarFactory() {
    return new Rollbar({
        accessToken: 'd924194b4e9d4a36b9c8954a2af303f6',
        captureUncaught: true,
        captureUnhandledRejections: true,
        enabled: !environment.development,
        payload: {
            environment: environment.name
        }
    });
}

@Injectable()
export class RollbarErrorHandler implements ErrorHandler {

    constructor(private injector: Injector) {
    }

    handleError(err: any): void {
        const rollbar = this.injector.get(RollbarService);
        rollbar.error(err.originalError || err);
    }

}

export const RollbarService = new InjectionToken<Rollbar>('rollbar');
