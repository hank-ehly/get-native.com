/**
 * local-storage.service
 * get-native.com
 *
 * Created by henryehly on 2016/11/20.
 */

import { Injectable } from '@angular/core';
import { Logger } from 'angular2-logger/core';
import { Subject } from 'rxjs/Subject';

@Injectable()

/* TODO: Encrypt all stored data */
/* TODO: Add EncryptionService */
export class LocalStorageService {
    setItemSource = new Subject<any>(); // TODO: Replace <any> with type
    setItem$ = this.setItemSource.asObservable(); // TODO: Test via component that uses this property

    constructor(private logger: Logger) {
    }

    get length(): number {
        let retVal = localStorage.length;
        this.logger.debug(`[LocalStorageService]: get length() - ${retVal}`);
        return retVal;
    }

    key(index: number): string {
        let retVal = localStorage.key(index);
        this.logger.debug(`[LocalStorageService]: key(${index}) - ${retVal}`);
        return retVal;
    }

    clear(): void {
        this.logger.debug('[LocalStorageService]: clear()');
        return localStorage.clear();
    }

    /* TODO: Be able to input whatever object you want */
    setItem(key: string, data: any): void {
        this.logger.debug(`[LocalStorageService]: setItem(${key}, ${data})`);

        if (data === null || data === undefined) {
            /* TODO: ErrorService */
            throw new Error('Cannot store a null or undefined value.');
        } else if (typeof data !== 'string') {
            data = JSON.stringify(data);
        }

        localStorage.setItem(key, data);
        this.setItemSource.next({key: key, data: data});
    }

    getItem(key: string): any {
        let retVal = localStorage.getItem(key);
        this.logger.debug(`[LocalStorageService]: getItem(${key}) - ${retVal}`);

        try {
            return JSON.parse(retVal);
        } catch (e) {
            return retVal;
        }
    }

    hasItem(key: string): boolean {
        let retVal = this.getItem(key) !== null;
        this.logger.debug(`[LocalStorageService]: hasItem(${key}) - ${retVal}`);
        return retVal;
    }

    removeItem(key: string): void {
        this.logger.debug(`[LocalStorageService]: removeItem(${key})`);
        return localStorage.removeItem(key);
    }
}
