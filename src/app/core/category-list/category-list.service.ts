/**
 * category-list.service
 * getnativelearning.com
 *
 * Created by henryehly on 2017/02/05.
 */

import { Injectable } from '@angular/core';

import { HttpService } from '../http/http.service';
import { APIHandle } from '../http/api-handle';
import { Entities } from '../entities/entities';
import { Category } from '../entities/category';

import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CategoryListService {
    private data$ = new ReplaySubject<Entities<Category>>(1);

    constructor(private http: HttpService) {
    }

    fetch(): Observable<Entities<Category>> {
        if (!this.data$.observers.length) {
            this.http.request(APIHandle.CATEGORIES).subscribe(this.onFetchSuccess.bind(this), this.onFetchError.bind(this));
        }

        return this.data$;
    }

    private onFetchSuccess(d: Entities<Category>) {
        this.data$.next(d);
    }

    private onFetchError(e: any) {
        this.data$.next(e);
        this.data$ = new ReplaySubject<Entities<Category>>(1);
    }
}
