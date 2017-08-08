/**
 * local-storage.service
 * getnativelearning.com
 *
 * Created by henryehly on 2016/11/20.
 */

import { Injectable } from '@angular/core';

import { LocalStorageItem } from './local-storage-item';
import { Logger } from '../logger/logger';

import { Subject } from 'rxjs/Subject';

@Injectable()
export class LocalStorageService {
    storageEvent$ = new Subject<StorageEvent>();
    clear$        = new Subject();
    setItem$      = new Subject<LocalStorageItem>();

    constructor(private logger: Logger) {
        this.clear$.subscribe(() => localStorage.clear());
    }

    broadcastStorageEvent(ev: StorageEvent): void {
        if (ev.key === null && ev.newValue === null && ev.oldValue === null) {
            this.logger.debug(this, 'Storage Event clear()');
            this.clear$.next();
        } else {
            this.logger.debug(this, `Storage Event ${ev.key}`);
            this.storageEvent$.next(ev);
        }
    }

    get length(): number {
        const retVal = localStorage.length;
        this.logger.debug(this, `get length() - ${retVal}`);
        return retVal;
    }

    /* Todo: Encrypt all stored data */
    setItem(key: string, data: any): void {
        if (data === null || data === undefined) {
            /* Todo: ErrorService */
            throw new Error('Cannot store a null or undefined value.');
        } else if (typeof data !== 'string') {
            data = JSON.stringify(data);
        }

        localStorage.setItem(key, data);
        this.setItem$.next({key: key, data: data});
    }

    getItem(key: string): any {
        const retVal = localStorage.getItem(key);

        try {
            return JSON.parse(retVal);
        } catch (e) {
            return retVal;
        }
    }

    hasItem(key: string): boolean {
        return this.getItem(key) !== null;
    }

    removeItem(key: string): void {
        this.logger.debug(this, `removeItem('${key}')`);
        localStorage.removeItem(key);
        this.setItem$.next({key: key, data: null});
    }
}
