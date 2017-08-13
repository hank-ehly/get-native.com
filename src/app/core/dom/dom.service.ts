import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable()
export class DOMService {

    constructor() {
    }

    pathForMouseEvent(e: MouseEvent): any[] {
        if (_.has(e, 'path')) {
            return e['path'];
        } else if (_.isFunction(e['composedPath'])) {
            return e['composedPath']();
        } else {
            return null;
        }
    }
}
