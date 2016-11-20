/**
 * local-storage-protocol
 * get-native.com
 *
 * Created by henryehly on 2016/11/20.
 */

import { LocalStorageChange } from './index';

export interface LocalStorageProtocol {
    localStorageValueChanged(x: LocalStorageChange): void;
}
