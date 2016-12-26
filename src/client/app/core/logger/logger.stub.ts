/**
 * logger.stub
 * get-native.com
 *
 * Created by henryehly on 2016/12/26.
 */

import { Logger } from './logger';

export const STUBLogger: Logger = <Logger>{
    debug(message?: any, ...optionalParams: any[]): void {
        return;
    }
};
