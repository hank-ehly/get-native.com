/**
 * local-storage.service.spec
 * get-native.com
 *
 * Created by henryehly on 2016/11/20.
 */

import { LocalStorageService } from './index';
import { Logger } from 'angular2-logger/core';

let loggerStub = {
    debug(message?: any, ...optionalParams: any[]): void {
    }
};

export function main() {
    let localStorageService: LocalStorageService;

    describe('LocalStorageService', () => {
        beforeEach(() => {
            localStorageService = new LocalStorageService(<Logger>loggerStub);
        });

        it('should be able to set a key/value pair', () => {
            let key = 'aKey';
            let val = 'aVal';
            localStorageService.setItem(key, val);
            expect(localStorage.getItem(key)).toEqual(val);
        });

        it('should be able to update a key/value pair', () => {
            let key = 'aKey';
            let val = 'aVal';
            let val_updated = val + '_updated';
            localStorageService.setItem(key, val);
            localStorageService.setItem(key, val_updated);
            expect(localStorage.getItem(key)).toEqual(val_updated);
        });

        it('should be able to remove a key/value pair', () => {
            let key = 'aKey';
            let val = 'aVal';
            localStorageService.setItem(key, val);
            localStorageService.removeItem(key);
            expect(localStorage.getItem(key)).toBeNull();
        });

        it('should be able to check if a key/value pair exists', () => {
            let key = 'aKey';
            let val = 'aVal';
            localStorageService.setItem(key, val);
            let isSet = localStorageService.hasItem(key);
            expect(isSet).toEqual(true);
        });

        it('should be able to clear the local cache completely', () => {
            let key_1 = 'aKey_1';
            let val_1 = 'aVal_1';
            localStorageService.setItem(key_1, val_1);

            let key_2 = 'aKey_2';
            let val_2 = 'aVal_2';
            localStorageService.setItem(key_2, val_2);

            localStorageService.clear();
            expect(localStorageService.length).toEqual(0);
        });
    });
}
