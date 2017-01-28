/**
 * logger
 * get-native.com
 *
 * Created by henryehly on 2016/12/24.
 */

import { Injectable, Inject } from '@angular/core';

import { LoggerConfig } from './logger-config';
import { LOG_LEVEL } from './log-level';
import { Config } from '../../shared/config/env.config';

@Injectable()
export class Logger {
    constructor(@Inject(LoggerConfig) private logLevel: LOG_LEVEL = LOG_LEVEL.WARN) {
        if (Config.ENV === 'DEV') this.debug(`[${this.constructor.name}] logLevel = ${logLevel}`);
    }

    warn(message?: any, ...optionalParams: any[]): void {
        if (window.console && this.logLevel >= LOG_LEVEL.WARN) {
            if (Config.ENV === 'DEV') console.warn.apply(console, arguments);
        }
    };

    error(message?: any, ...optionalParams: any[]): void {
        if (window.console && this.logLevel >= LOG_LEVEL.ERROR) {
            if (Config.ENV === 'DEV') console.error.apply(console, arguments);
        }
    };

    info(message?: any, ...optionalParams: any[]): void {
        if (window.console && this.logLevel >= LOG_LEVEL.INFO) {
            if (Config.ENV === 'DEV') console.info.apply(console, arguments);
        }
    };

    debug(message?: any, ...optionalParams: any[]): void {
        if (window.console && this.logLevel >= LOG_LEVEL.DEBUG) {
            if (Config.ENV === 'DEV') console.debug.apply(console, arguments);
        }
    }
}
