/**
 * video-search.component
 * getnativelearning.com
 *
 * Created by henryehly on 2017/02/11.
 */

import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { URLSearchParams } from '@angular/http';

import { CategoryListService } from '../../core/category-list/category-list.service';
import { NavbarService } from '../../core/navbar/navbar.service';
import { LanguageCode } from '../../core/typings/language-code';
import { Subcategory } from '../../core/entities/subcategory';
import { HttpService } from '../../core/http/http.service';
import { UserService } from '../../core/user/user.service';
import { Category } from '../../core/entities/category';
import { Entities } from '../../core/entities/entities';
import { APIHandle } from '../../core/http/api-handle';
import { CategoryFilter } from './category-filter';
import { Video } from '../../core/entities/video';
import { Logger } from '../../core/logger/logger';

import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
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

    filterByCategory$ = new BehaviorSubject<CategoryFilter>({
        text: null,
        value: null,
        type: null
    });

    categoryFilter$ = this.filterByCategory$.distinctUntilChanged();

    showDropdown$ = new BehaviorSubject<boolean>(false);
    isDropdownVisible$ = this.showDropdown$.distinctUntilChanged();

    studyLanguageCode$ = this.user.currentStudyLanguage$.pluck('code').distinctUntilChanged();

    maxVideoId: number;
    cuedOnly = false;
    hasCompletedInitialLoad = false;

    loading$ = new BehaviorSubject<boolean>(false);

    public loadMoreVideos$ = new Subject<number>();

    protected query$ = this.navbar.query$.startWith('').debounce(() => {
        return this.hasCompletedInitialLoad ? this.debounceTimer : this.noDebounceTimer;
    }).distinctUntilChanged();

    videos$ = this.studyLanguageCode$.combineLatest(this.categoryFilter$, this.query$)
        .switchMap(([lang, filter, query]: [LanguageCode, CategoryFilter, string]) => {
            return this.loadMoreVideos$.startWith(null).distinctUntilChanged().do(() => {
                this.loading$.next(true);
            }).concatMap((maxId?: number) => {
                this.hasCompletedInitialLoad = true;

                const search = new URLSearchParams();

                if (filter.value && filter.type === 'Subcategory') {
                    search.set('subcategory_id', filter.value.toString());
                } else if (filter.value && filter.type === 'Category') {
                    search.set('category_id', filter.value.toString());
                }

                if (maxId) {
                    search.set('max_id', maxId.toString());
                }

                if (lang) {
                    search.set('lang', lang);
                }

                if (query) {
                    search.set('q', query);
                }

                // todo: get rid of global context
                if (this.cuedOnly) {
                    search.set('cued_only', 'true');
                }

                search.set('time_zone_offset', new Date().getTimezoneOffset().toString());
                search.set('count', `${9}`);

                return this.http.request(APIHandle.VIDEOS, {search: search});
            }, (unused: any, videos: Entities<Video>) => videos.records)
                .do(this.updateMaxVideoId.bind(this))
                .scan(this.concatVideos, [])
                .do(() => {
                    this.loading$.next(false);
                });
        }).share();

    protected subscriptions: Subscription[] = [];

    private debounceTimer   = new TimerObservable(300);
    private noDebounceTimer = new TimerObservable(0);

    @HostListener('document:mousedown', ['$event']) onMouseDown(e: MouseEvent) {
        if (!this.showDropdown$.getValue()) {
            return;
        }

        let found = false;
        const path: any[] = (<any>e).path;

        if (path) {
            for (let i = 0; i < path.length; i++) {
                if (path[i].tagName && path[i].tagName.toLowerCase() === 'gn-category-list') {
                    found = true;
                    break;
                }
            }
        }

        this.showDropdown$.next(found);
    }

    constructor(protected logger: Logger, protected http: HttpService, protected navbar: NavbarService, protected user: UserService,
                protected categoryList: CategoryListService) {
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
        return records ? _.unionWith(acc, records, _.isEqual) : [];
    }
}
