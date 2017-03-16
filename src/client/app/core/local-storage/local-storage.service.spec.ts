/**
 * local-storage.service.spec
 * get-native.com
 *
 * Created by henryehly on 2016/11/20.
 */

import { LocalStorageService } from './local-storage.service';
import { STUBLogger } from '../logger/logger.stub';

export function main() {
    let localStorageService: LocalStorageService;

    describe('LocalStorageService', () => {
        beforeEach(() => {
            localStorage.clear();
            localStorageService = new LocalStorageService(STUBLogger);
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

            expect(localStorageService.length).toEqual(2);

            localStorageService.clear();
            expect(localStorageService.length).toEqual(0);
        });

        it('should be able to store a boolean value', () => {
            let key = 'aKey';
            let val = true;
            localStorageService.setItem(key, val);
            expect(localStorageService.getItem(key)).toEqual(val);
        });

        it('should be able to store a number value', () => {
            let key = 'aKey';
            let val = 576;
            localStorageService.setItem(key, val);
            expect(localStorageService.getItem(key)).toEqual(val);
        });

        it('should be able to store an array', () => {
            let key = 'aKey';
            let val = [1, 2, 3];
            localStorageService.setItem(key, val);
            expect(localStorageService.getItem(key)).toEqual(val);
        });

        it('should not be able to store a null value', () => {
            let key = 'aKey';
            let val = <any>null;
            expect(() => localStorageService.setItem(key, val)).toThrowError('Cannot store a null or undefined value.');
        });

        it('should not be able to store an undefined value', () => {
            let key = 'aKey';
            let val = <any>undefined;
            expect(() => localStorageService.setItem(key, val)).toThrowError('Cannot store a null or undefined value.');
        });

        it('should be able to store a nested object', () => {
            let key = 'aKey';
            let val = {foo: 'bar', baz: ['foo', 'bar', 123]};
            localStorageService.setItem(key, val);
            expect(localStorageService.getItem(key)).toEqual(val);
        });
    });
}
