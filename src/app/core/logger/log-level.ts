/**
 * log-level
 * getnative.org
 *
 * Created by henryehly on 2016/12/24.
 */

import { InjectionToken } from '@angular/core';

export const LogLevelToken = new InjectionToken<LogLevelValue>('log-level');

export enum LogLevelValue {
    OFF,
    WARN,
    ERROR,
    INFO,
    DEBUG
}
