/**
 * stubs
 * get-native.com
 *
 * Created by henryehly on 2016/11/23.
 */

import { Subject } from 'rxjs/Subject';

import { Logger } from 'angular2-logger/core';

import { LoginService, LocalStorageService } from '../../core/index';

export const STUBLogger: Logger = <Logger>{
    debug(message?: any, ...optionalParams: any[]): void {}
};

export const STUBLoginService: LoginService = <LoginService>{
    showModal$: new Subject().asObservable()
};

export const STUBLocalStorageService: LocalStorageService = <LocalStorageService>{
    setItem(key: string, data: any): void {},
    setItem$: { subscribe(): void {} },
    storageEvent$: { subscribe(): void {} },
    clearSource$: { subscribe(): void {} }
};
