/**
 * local-storage.service
 * get-native.com
 *
 * Created by henryehly on 2016/11/20.
 */

import { Injectable } from '@angular/core';

import { Logger, LocalStorageItem } from '../index';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LocalStorageService {
    setItem$: Observable<LocalStorageItem>;
    storageEvent$: Observable<StorageEvent>;
    clearSource$: Observable<any>;

    private setItemSource: Subject<LocalStorageItem>;
    private storageEventSource: Subject<StorageEvent>;
    private clearSource: Subject<any>;

    constructor(private logger: Logger) {
        this.setItemSource = new Subject<LocalStorageItem>();
        this.storageEventSource = new Subject<StorageEvent>();
        this.clearSource = new Subject<any>();

        this.setItem$ = this.setItemSource.asObservable();
        this.storageEvent$ = this.storageEventSource.asObservable();
        this.clearSource$ = this.clearSource.asObservable();
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
        this.logger.debug(`[${this.constructor.name}]: get length() - ${retVal}`);
        return retVal;
    }

    key(index: number): string {
        let retVal = localStorage.key(index);
        this.logger.debug(`[${this.constructor.name}]: key('${index}) - ${retVal}'`);
        return retVal;
    }

    clear(): void {
        this.logger.debug('[${this.constructor.name]: clear()');
        return localStorage.clear();
    }

    /* Todo: Encrypt all stored data */
    setItem(key: string, data: any): void {
        this.logger.debug(`[${this.constructor.name}]: setItem('${key}, ${data})'`);

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
        this.logger.debug(`[${this.constructor.name}]: getItem('${key}) - ${retVal}'`);

        try {
            return JSON.parse(retVal);
        } catch (e) {
            return retVal;
        }
    }

    hasItem(key: string): boolean {
        let retVal = this.getItem(key) !== null;
        this.logger.debug(`[${this.constructor.name}]: hasItem('${key}) - ${retVal}'`);
        return retVal;
    }

    removeItem(key: string): void {
        this.logger.debug(`[${this.constructor.name}]: removeItem('${key}')`);
        return localStorage.removeItem(key);
    }
}
