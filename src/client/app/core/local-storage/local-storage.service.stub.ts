/**
 * local-storage.service.stub
 * get-native.com
 *
 * Created by henryehly on 2016/12/26.
 */

import { LocalStorageService } from './local-storage.service';

import { Observable } from 'rxjs/Observable';

export class STUBLocalStorageService extends LocalStorageService {
    setItem$: Observable<any>;
    storageEvent$: Observable<any>;
    clearSource$: Observable<any>;

    setItem(key: string, data: any): void {
        return;
    }
}
