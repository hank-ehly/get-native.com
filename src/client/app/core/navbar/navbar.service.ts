/**
 * navbar.service
 * get-native.com
 *
 * Created by henryehly on 2016/12/04.
 */

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/mapTo';

import * as _ from 'lodash';

export class NavbarService {
    title$               = new Subject<string>();
    query$               = new Subject<string>();

    backButtonTitle$     = new Subject<any>();

    searchBarVisible$ = new BehaviorSubject<boolean>(false);

    updateQuery(value: string): void {
        this.query$.next(_.trim(value));
    }

    constructor() {
        this.searchBarVisible$.mapTo('').subscribe(this.query$);
    }
}
