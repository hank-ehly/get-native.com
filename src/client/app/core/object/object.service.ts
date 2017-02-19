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
        let objCopy = Object.assign({}, obj);

        if (obj.length === undefined) {
            return this.renamePropertySingle(objCopy, mappings);
        }

        let arrCopy: any[] = [];
        for (let o of obj) {
            arrCopy.push(Object.assign({}, o));
        }

        for (let i = 0; i < arrCopy.length; i++) {
            let item = arrCopy[i];
            item = this.renamePropertySingle(item, mappings);
        }

        return arrCopy;
    }

    private renamePropertySingle(obj: any, mappings: any[]): any {
        for (let i = 0; i < mappings.length; i++) {
            let mapping = mappings[i];

            if (obj.hasOwnProperty(mapping[OLD_P_NAME])) {
                obj[mapping[NEW_P_NAME]] = obj[mapping[OLD_P_NAME]];
                delete obj[mapping[OLD_P_NAME]];
            }
        }

        return obj;
    }
}
