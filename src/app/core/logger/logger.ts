/**
 * logger
 * getnativelearning.com
 *
 * Created by henryehly on 2016/12/24.
 */

import { Injectable, Inject } from '@angular/core';

import { LogLevelValue, LogLevelToken } from './log-level';

@Injectable()
export class Logger {

    constructor(@Inject(LogLevelToken) private logLevel: LogLevelValue = LogLevelValue.WARN) {
        this.debug(this, `logLevel = ${logLevel}`);
    }

    warn(_: Object, message?: any, ...optionalParams: any[]): void {
        if (window.console && this.logLevel >= LogLevelValue.WARN) {
            console.warn.apply(console, [`[${_.constructor.name}]`, message, ...optionalParams]);
        }
    }

    error(_: Object, message?: any, ...optionalParams: any[]): void {
        if (window.console && this.logLevel >= LogLevelValue.ERROR) {
            console.error.apply(console, [`[${_.constructor.name}]`, message, ...optionalParams]);
        }
    }

    info(_: Object, message?: any, ...optionalParams: any[]): void {
        if (window.console && this.logLevel >= LogLevelValue.INFO) {
            console.info.apply(console, [`[${_.constructor.name}]`, message, ...optionalParams]);
        }
    }

    debug(_: Object, message?: any, ...optionalParams: any[]): void {
        if (window.console && this.logLevel >= LogLevelValue.DEBUG) {
            console.debug.apply(console, [`[${_.constructor.name}]`, message, ...optionalParams]);
        }
    }

}
