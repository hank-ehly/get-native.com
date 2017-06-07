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

@Injectable()
export class CategoryListService {
    private data$ = new ReplaySubject<Categories>(1);

    constructor(private http: HttpService) {
    }

    fetch(): Observable<Categories> {
        if (!this.data$.observers.length) {
            this.http.request(APIHandle.CATEGORIES).subscribe(this.onFetchSuccess.bind(this), this.onFetchError.bind(this));
        }

        return this.data$;
    }

    private onFetchSuccess(d: Categories) {
        this.data$.next(d);
    }

    private onFetchError(e: any) {
        this.data$.next(e);
        this.data$ = new ReplaySubject<Categories>(1);
    }
}
