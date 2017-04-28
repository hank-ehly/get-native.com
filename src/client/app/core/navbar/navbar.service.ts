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
    query$               = new Subject<string>();

    title$               = new Subject<string>();
    backButtonTitle$     = new BehaviorSubject<string>(null);

    studyOptionsVisible$ = new Subject<boolean>();
    searchBarVisible$    = new Subject<boolean>();

    queue$               = new Subject<void>();

    updateQuery(value: string): void {
        this.query$.next(_.trim(value));
    }

    constructor() {
        this.searchBarVisible$.mapTo('').subscribe(this.query$);
    }
}
