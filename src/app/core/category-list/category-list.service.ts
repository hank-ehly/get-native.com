/**
 * category-list.service
 * getnative.org
 *
 * Created by henryehly on 2017/02/05.
 */

import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import { HttpService } from '../http/http.service';
import { UserService } from '../user/user.service';
import { LangService } from '../lang/lang.service';
import { Entities } from '../entities/entities';
import { Category } from '../entities/category';
import { APIHandle } from '../http/api-handle';
import { Entity } from '../entities/entity';

import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CategoryListService {
    private data$ = new ReplaySubject<Entities<Category>>(1);

    constructor(private http: HttpService, private user: UserService, @Inject(LOCALE_ID) private localeId: string,
                private lang: LangService) {
    }

    fetch(): Observable<Entities<Category>> {
        if (!this.data$.observers.length) {
            let request: Observable<Entities<Entity>|Entity>;
            if (this.user.isAuthenticated()) {
                request = this.http.request(APIHandle.CATEGORIES);
            } else {
                let params = new HttpParams();
                params = params.set('lang', this.lang.languageForLocaleId(this.localeId).code);
                request = this.http.request(APIHandle.CATEGORIES, {params: params});
            }
            request.subscribe(this.onFetchSuccess.bind(this), this.onFetchError.bind(this));
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
