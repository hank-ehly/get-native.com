/**
 * local-storage.service
 * get-native.com
 *
 * Created by henryehly on 2016/11/20.
 */

import { Injectable } from '@angular/core';
import { Logger } from 'angular2-logger/core';

@Injectable()

export class LocalStorageService {
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

    setItem(key: string, data: string): void {
        this.logger.debug(`[LocalStorageService]: setItem(${key}, ${data})`);
        return localStorage.setItem(key, data);
    }

    getItem(key: string): any {
        let retVal = localStorage.getItem(key);
        this.logger.debug(`[LocalStorageService]: getItem(${key}) - ${retVal}`);
        return retVal;
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
