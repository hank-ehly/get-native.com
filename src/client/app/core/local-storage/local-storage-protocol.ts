/**
 * local-storage-protocol
 * get-native.com
 *
 * Created by henryehly on 2016/11/20.
 */

import { LocalStorageItem } from './local-storage-item';

export declare abstract class LocalStorageProtocol {
    abstract didSetLocalStorageItem(item: LocalStorageItem): void;
    abstract didReceiveStorageEvent(event: StorageEvent): void;
    abstract didClearStorage(): void;
}
