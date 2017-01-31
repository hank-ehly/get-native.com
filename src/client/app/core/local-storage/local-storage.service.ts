/**
 * local-storage.service
 * get-native.com
 *
 * Created by henryehly on 2016/11/20.
 */

import { Injectable } from '@angular/core';

import { LocalStorageItem } from './local-storage-item';
import { Logger } from '../logger/logger';

import { Subject } from 'rxjs/Subject';

@Injectable()
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
            this.logger.debug(`[${this.constructor.name}] Storage Event 'clear()'`);
            this.clearSource.next();
        } else {
            this.logger.debug(`[${this.constructor.name}] Storage Event ${ev.key}`);
            this.storageEventSource.next(ev);
        }
    }

    get length(): number {
        let retVal = localStorage.length;
        this.logger.debug(`[${this.constructor.name}]: get length() - ${retVal}`);
        return retVal;
    }

    key(index: number): string {
        let retVal = localStorage.key(index);
        this.logger.debug(`[${this.constructor.name}]: key('${index}) - ${retVal}'`);
        return retVal;
    }

    clear(): void {
        this.logger.debug(`[${this.constructor.name}]: clear()`);
        localStorage.clear();
        this.clearSource.next();
    }

    /* Todo: Encrypt all stored data */
    setItem(key: string, data: any): void {
        this.logger.debug(`[${this.constructor.name}]: setItem '${key}'`);

        if (data === null || data === undefined) {
            /* Todo: ErrorService */
            throw new Error('Cannot store a null or undefined value.');
        } else if (typeof data !== 'string') {
            data = JSON.stringify(data);
        }

        localStorage.setItem(key, data);
        this.setItemSource.next({key: key, data: data});
    }

    getItem(key: string): any {
        let retVal = localStorage.getItem(key);

        try {
            return JSON.parse(retVal);
        } catch (e) {
            return retVal;
        }
    }

    hasItem(key: string): boolean {
        let retVal = this.getItem(key) !== null;
        this.logger.debug(`[${this.constructor.name}]: hasItem '${key}' ? ${retVal}`);
        return retVal;
    }

    removeItem(key: string): void {
        this.logger.debug(`[${this.constructor.name}]: removeItem('${key}')`);
        localStorage.removeItem(key);
        this.setItemSource.next({key: key, data: null});
    }
}
