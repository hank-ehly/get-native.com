/**
 * stubs
 * get-native.com
 *
 * Created by henryehly on 2016/11/23.
 */

import { NavigationExtras, Router } from '@angular/router';

import { LocalStorageService, LoginService, PasswordService, Logger } from '../index';

import { Subject } from 'rxjs/Subject';

export const STUBLogger: Logger = <Logger>{
    debug(message?: any, ...optionalParams: any[]): void {}
};

export const STUBLoginService: LoginService = <LoginService>{
    showModal$: new Subject().asObservable(),
    hideModal$: new Subject().asObservable(),
    setActiveView$: new Subject<string>().asObservable()
};

export const STUBLocalStorageService: LocalStorageService = <LocalStorageService>{
    setItem(key: string, data: any): void {},
    setItem$: { subscribe(): void {} },
    storageEvent$: { subscribe(): void {} },
    clearSource$: { subscribe(): void {} }
};

export const STUBPasswordService: PasswordService = <PasswordService>{
    calculateStrength(password: string): number { return 0; }
};

export const STUBPasswords = {
    veryWeak: 'very weak',
    weak: 'we@k',
    good: 'go0D12',
    strong: 'sTr0nG12',
    veryStrong: 'very_sTr0nG12'
};

export const STUBRouter = <Router>{
    navigate(commands: any[], extras?: NavigationExtras): Promise<boolean> {
        return null;
    }
};
