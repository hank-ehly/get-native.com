/**
 * video-search.component
 * getnativelearning.com
 *
 * Created by henryehly on 2017/02/11.
 */

import { Component, HostListener, Inject, LOCALE_ID, OnDestroy, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import { CategoryListService } from '../../core/category-list/category-list.service';
import { NavbarService } from '../../core/navbar/navbar.service';
import { LanguageCode } from '../../core/typings/language-code';
import { Subcategory } from '../../core/entities/subcategory';
import { HttpService } from '../../core/http/http.service';
import { LangService } from '../../core/lang/lang.service';
import { UserService } from '../../core/user/user.service';
import { Category } from '../../core/entities/category';
import { DOMService } from '../../core/dom/dom.service';
import { APIHandle } from '../../core/http/api-handle';
import { LoadingState } from './loading-state.enum';
import { CategoryFilter } from './category-filter';
import { Video } from '../../core/entities/video';
import { Logger } from '../../core/logger/logger';

import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/debounce';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/scan';
import 'rxjs/observable/timer';
import * as _ from 'lodash';

@Component({
    template: '<!-- overridden -->'
})
export class VideoSearchComponent implements OnInit, OnDestroy {

    categories$ = this.categoryList.fetch();

    filterByCategory$ = new BehaviorSubject<CategoryFilter>({text: null, value: null, type: null});
    categoryFilter$ = this.filterByCategory$.distinctUntilChanged();

    showDropdown$ = new BehaviorSubject<boolean>(false);
    isDropdownVisible$ = this.showDropdown$.distinctUntilChanged();

    studyLanguageCode$ = this.user.currentStudyLanguage$
        .pluck('code')
        .distinctUntilChanged();

    maxVideoId: number;

    flags = {
        cuedOnly: false,
        hasReachedLastResult: false,
        hasCompletedInitialLoad: false,
        processing: {}
    };

    loadMoreVideos$ = new Subject<number>();
    currentLoadingState: LoadingState;
    loadingState = LoadingState;

    protected query$ = this.navbar.query$.startWith('').debounce(() => {
        return this.flags.hasCompletedInitialLoad ? this.debounceTimer : this.noDebounceTimer;
    }).distinctUntilChanged();

    videos$ = this.studyLanguageCode$.combineLatest(this.categoryFilter$, this.query$)
        .switchMap(([lang, filter, query]: [LanguageCode, CategoryFilter, string]) => {
            return this.loadMoreVideos$.startWith(null).distinctUntilChanged().do(() => {
                this.currentLoadingState = LoadingState.Loading;
            }).concatMap((maxId?: number) => {
                this.flags.hasCompletedInitialLoad = true;

                let params = new HttpParams();

                if (filter.value && filter.type === 'Subcategory') {
                    params = params.set('subcategory_id', filter.value.toString());
                } else if (filter.value && filter.type === 'Category') {
                    params = params.set('category_id', filter.value.toString());
                }

                if (maxId) {
                    params = params.set('max_id', maxId.toString());
                }

                if (lang) {
                    params = params.set('lang', lang);
                }

                if (query) {
                    params = params.set('q', query);
                }

                if (this.flags.cuedOnly) {
                    params = params.set('cued_only', 'true');
                }

                if (!this.user.isAuthenticated()) {
                    params = params.set('interface_lang', this.lang.languageForLocaleId(this.localeId).code);
                }

                params = params.set('time_zone_offset', new Date().getTimezoneOffset().toString());
                params = params.set('count', `${9}`);

                return this.http.request(APIHandle.VIDEOS, {params: params});
            }, (unused: any, videos: any) => videos.records)
                .do(this.updateMaxVideoId.bind(this))
                .do(() => {
                    if (this.currentLoadingState !== LoadingState.ReachedLastResult) {
                        this.currentLoadingState = LoadingState.CanLoadMore;
                    }
                })
                .scan(this.concatVideos.bind(this), []);
        }).share();

    private debounceTimer = new TimerObservable(300);
    private noDebounceTimer = new TimerObservable(0);

    @HostListener('document:mousedown', ['$event']) onMouseDown(e: MouseEvent) {
        if (!this.showDropdown$.getValue()) {
            return;
        }

        let found = false;
        const path = this.dom.pathForMouseEvent(e);

        if (path) {
            found = _.includes(_.map(path, p => _.toLower(p['tagName'])), 'gn-category-list');
        }

        this.showDropdown$.next(found);
    }

    constructor(protected logger: Logger, protected http: HttpService, protected navbar: NavbarService, protected user: UserService,
                protected categoryList: CategoryListService, protected dom: DOMService, protected lang: LangService,
                @Inject(LOCALE_ID) protected localeId: string) {
    }

    ngOnInit(): void {
        this.logger.debug(this, 'OnInit');
    }

    ngOnDestroy(): void {
        this.logger.debug(this, 'OnDestroy');
    }

    onClickResetDropdownSelection(): void {
        this.logger.debug(this, 'onClickResetDropdownSelection');
        this.filterByCategory$.next({text: null, value: null, type: null});
        this.showDropdown$.next(false);
    }

    onSelectCategory(category: Category): void {
        this.logger.debug(this, 'category', category);
        this.filterByCategory$.next({text: category.name, value: category.id, type: 'Category'});
        this.showDropdown$.next(false);
    }

    onSelectSubcategory(subcategory: Subcategory): void {
        this.logger.debug(this, 'subcategory', subcategory);
        this.filterByCategory$.next({text: subcategory.name, value: subcategory.id, type: 'Subcategory'});
        this.showDropdown$.next(false);
    }

    private updateMaxVideoId(records?: Video[]): void {
        if (!_.isEmpty(records)) {
            this.maxVideoId = _.last(records).id;
        }
    }

    private concatVideos(acc: Video[], records: Video[]) {
        if (!records) {
            return [];
        }

        if (acc.length && !records.length) {
            this.currentLoadingState = LoadingState.ReachedLastResult;
        } else if (!acc.length && !records.length) {
            this.currentLoadingState = LoadingState.NoResults;
        }

        return _.unionWith(acc, records, _.isEqual);
    }

}
