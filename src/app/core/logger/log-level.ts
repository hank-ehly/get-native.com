/**
 * log-level
 * get-native.com
 *
 * Created by henryehly on 2016/12/24.
 */

import { InjectionToken } from '@angular/core';

export let LogLevelToken = new InjectionToken('log-level');

export enum LogLevelValue {
    OFF,
    WARN,
    ERROR,
    INFO,
    DEBUG
}
