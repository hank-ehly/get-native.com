/**
 * navbar.service
 * get-native.com
 *
 * Created by henryehly on 2016/12/04.
 */

import { Subject } from 'rxjs/Subject';

import * as _ from 'lodash';

export class NavbarService {
    title$               = new Subject<string>();
    query$               = new Subject<string>();

    backButtonTitle$     = new Subject<any>();

    searchBarVisibility$ = new Subject<boolean>();

    search: any = {
        query: (value: string) => {
            this.query$.next(_.trim(value));
        }
    };
}
