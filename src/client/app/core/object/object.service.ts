/**
 * object.service
 * get-native.com
 *
 * Created by henryehly on 2017/02/18.
 */

import { Injectable } from '@angular/core';

const OLD_P_NAME = 0;
const NEW_P_NAME = 1;

@Injectable()
export class ObjectService {

    renameProperty(obj: any, mappings: any[]): any {
        if (obj.length === undefined) {
            return this.renamePropertySingle(obj, mappings);
        }

        let arr = obj;
        for (let i = 0; i < arr.length; i++) {
            let item = arr[i];
            item = this.renamePropertySingle(item, mappings);
        }

        return arr;
    }

    private renamePropertySingle(obj: any, mappings: any[]): any {
        for (let j = 0; j < mappings.length; j++) {
            let mapping = mappings[j];

            if (obj.hasOwnProperty(mapping[OLD_P_NAME])) {
                obj[mapping[NEW_P_NAME]] = obj[mapping[OLD_P_NAME]];
                delete obj[mapping[OLD_P_NAME]];
            }
        }

        return obj;
    }
}
