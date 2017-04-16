/**
 * navbar.service
 * get-native.com
 *
 * Created by henryehly on 2016/12/04.
 */

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/mapTo';

import * as _ from 'lodash';

export class NavbarService {
    title$               = new Subject<string>();
    query$               = new Subject<string>();

    backButtonTitle$     = new Subject<any>();

    searchBarVisibility$ = new Subject<boolean>();

    updateQuery(value: string): void {
        this.query$.next(_.trim(value));
    }

    constructor() {
        this.searchBarVisibility$.mapTo('').subscribe(this.query$);
    }
}
