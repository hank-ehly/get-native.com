/**
 * local-storage.service
 * get-native.com
 *
 * Created by henryehly on 2016/11/20.
 */

import { Injectable } from '@angular/core';
import { Logger } from 'angular2-logger/core';
import { Subject } from 'rxjs/Subject';

import { LocalStorageItem } from './local-storage-item';

@Injectable()

/* TODO: Encrypt all stored data */
/* TODO: Add EncryptionService */
export class LocalStorageService {
    setItemSource = new Subject<LocalStorageItem>();
    setItem$ = this.setItemSource.asObservable();

    storageEventSource = new Subject<StorageEvent>();
    storageEvent$ = this.storageEventSource.asObservable();

    clearSource = new Subject();
    clearSource$ = this.clearSource.asObservable();

    constructor(private logger: Logger) {
    }

    broadcastStorageEvent(ev: StorageEvent): void {
        if (ev.key === null && ev.newValue === null && ev.oldValue === null) {
            this.clearSource.next();
        } else {
            this.storageEventSource.next(ev);
        }
    }

    get length(): number {
        let retVal = localStorage.length;
        this.logger.debug(`[LocalStorageService]: get length() - ${retVal}`);
        return retVal;
    }

    key(index: number): string {
        let retVal = localStorage.key(index);
        this.logger.debug(`[LocalStorageService]: key('${index}) - ${retVal}'`);
        return retVal;
    }

    clear(): void {
        this.logger.debug('[LocalStorageService]: clear()');
        return localStorage.clear();
    }

    setItem(key: string, data: any): void {
        this.logger.debug(`[LocalStorageService]: setItem('${key}, ${data})'`);

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
        this.logger.debug(`[LocalStorageService]: getItem('${key}) - ${retVal}'`);

        try {
            return JSON.parse(retVal);
        } catch (e) {
            return retVal;
        }
    }

    hasItem(key: string): boolean {
        let retVal = this.getItem(key) !== null;
        this.logger.debug(`[LocalStorageService]: hasItem('${key}) - ${retVal}'`);
        return retVal;
    }

    removeItem(key: string): void {
        this.logger.debug(`[LocalStorageService]: removeItem('${key}')`);
        return localStorage.removeItem(key);
    }
}
