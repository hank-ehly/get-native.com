import * as Rollbar from 'rollbar';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler, Injectable, Injector } from '@angular/core';

const rollbarConfig = {
    accessToken: '3337152065794868a793603b1bf573fa',
    captureUncaught: true,
    captureUnhandledRejections: true,
};

export function rollbarFactory() {
    return new Rollbar(rollbarConfig);
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