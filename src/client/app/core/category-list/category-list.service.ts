/**
 * category-list.service
 * get-native.com
 *
 * Created by henryehly on 2017/02/05.
 */

import { Injectable } from '@angular/core';

import { HttpService } from '../http/http.service';
import { APIHandle } from '../http/api-handle';
import { Categories } from '../entities/categories';

import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';
import { Logger } from '../logger/logger';

// Todo: This is causing us to get logged out on page transition
@Injectable()
export class CategoryListService {
    private data$ = new ReplaySubject<Categories>(1);

    constructor(private http: HttpService, private logger: Logger) {
        this.logger.debug(this, 'Init');
    }

    fetch(): Observable<Categories> {
        if (!this.data$.observers.length) {
            this.http.request(APIHandle.CATEGORIES).subscribe((d: Categories) => {
                    this.logger.debug(this, 'next', d);
                    this.data$.next(d);
                }, (e: any) => {
                    this.logger.debug(this, 'error', e);
                    this.data$.next(e);
                    this.data$ = new ReplaySubject<Categories>(1);
                }
            );
        }

        return this.data$;
    }
}
