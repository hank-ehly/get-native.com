/**
 * local-storage.service.stub
 * getnativelearning.com
 *
 * Created by henryehly on 2016/12/26.
 */

import { LocalStorageService } from './local-storage.service';

import { Subject } from 'rxjs/Subject';

export class STUBLocalStorageService extends LocalStorageService {
    setItem$: Subject<any>;
    storageEvent$: Subject<any>;
    clear$: Subject<any>;

    setItem(key: string, data: any): void {
        return;
    }
}
