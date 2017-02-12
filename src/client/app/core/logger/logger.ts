/**
 * logger
 * get-native.com
 *
 * Created by henryehly on 2016/12/24.
 */

import { Injectable, Inject } from '@angular/core';

import { LogLevelValue, LogLevelToken } from './log-level';
import { Config } from '../../shared/config/env.config';

@Injectable()
export class Logger {
    constructor(@Inject(LogLevelToken) private logLevel: LogLevelValue = LogLevelValue.WARN) {
        this.debug(this, `logLevel = ${logLevel}`);
    }

    warn(_: Object, message?: any, ...optionalParams: any[]): void {
        if (window.console && this.logLevel >= LogLevelValue.WARN && Config.ENV === 'DEV') {
            console.warn.apply(console, [`[${_.constructor.name}]`, message, ...optionalParams]);
        }
    };

    error(_: Object, message?: any, ...optionalParams: any[]): void {
        if (window.console && this.logLevel >= LogLevelValue.ERROR && Config.ENV === 'DEV') {
            console.error.apply(console, [`[${_.constructor.name}]`, message, ...optionalParams]);
        }
    };

    info(_: Object, message?: any, ...optionalParams: any[]): void {
        if (window.console && this.logLevel >= LogLevelValue.INFO && Config.ENV === 'DEV') {
            console.info.apply(console, [`[${_.constructor.name}]`, message, ...optionalParams]);
        }
    };

    debug(_: Object, message?: any, ...optionalParams: any[]): void {
        if (window.console && this.logLevel >= LogLevelValue.DEBUG && Config.ENV === 'DEV') {
            console.debug.apply(console, [`[${_.constructor.name}]`, message, ...optionalParams]);
        }
    };
}
