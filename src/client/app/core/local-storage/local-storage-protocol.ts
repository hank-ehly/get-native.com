/**
 * local-storage-protocol
 * get-native.com
 *
 * Created by henryehly on 2016/11/20.
 */

import { LocalStorageItem } from './index';

export interface LocalStorageProtocol {
    didSetLocalStorageItem(item: LocalStorageItem): void;
    didReceiveStorageEvent(event: StorageEvent): void;
    didClearStorage(): void;
}
