/**
 * local-storage.service.stub
 * get-native.com
 *
 * Created by henryehly on 2016/12/26.
 */

import { LocalStorageService } from './local-storage.service';

export const STUBLocalStorageService: LocalStorageService = <LocalStorageService>{
    setItem(key: string, data: any): void {
        return;
    },

    setItem$: {
        subscribe(): void {
            return;
        }
    },

    storageEvent$: {
        subscribe(): void {
            return;
        }
    },

    clearSource$: {
        subscribe(): void {
            return;
        }
    }
};
