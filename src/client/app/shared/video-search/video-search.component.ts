/**
 * video-search.component
 * get-native.com
 *
 * Created by henryehly on 2017/02/11.
 */

import { Component, HostListener } from '@angular/core';
import { URLSearchParams } from '@angular/http';

import { APIHandle } from '../../core/http/api-handle';
import { Videos } from '../../core/entities/videos';
import { LanguageCode } from '../../core/typings/language-code';
import { Logger } from '../../core/logger/logger';
import { HttpService } from '../../core/http/http.service';
import { NavbarService } from '../../core/navbar/navbar.service';
import { Subcategory } from '../../core/entities/subcategory';
import { Category } from '../../core/entities/category';
import { UserService } from '../../core/user/user.service';
import { CategoryFilter } from './category-filter';
import { Video } from '../../core/entities/video';

import * as _ from 'lodash';
import '../../operators';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/debounce';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { TimerObservable } from 'rxjs/observable/TimerObservable';

import 'rxjs/observable/timer';

@Component({
    template: ''
})
export class VideoSearchComponent {
    categories$ = this.http.request(APIHandle.CATEGORIES);

    filterByCategory$ = new BehaviorSubject<CategoryFilter>({
        text: 'All videos',
        value: null,
        type: null
    });

    categoryFilter$ = this.filterByCategory$.distinctUntilChanged();

    showDropdown$ = new BehaviorSubject<boolean>(false);
    isDropdownVisible$ = this.showDropdown$.distinctUntilChanged();

    studyLanguage$ = this.user.currentStudyLanguage$.distinctUntilChanged().pluck('code');

    maxVideoId: number;
    cuedOnly: boolean = false;
    hasCompletedInitialLoad: boolean = false;

    public loadMoreVideos$ = new Subject<number>();

    protected query$ = this.navbar.query$.startWith('').debounce(() => {
        return this.hasCompletedInitialLoad ? this.debounceTimer : this.noDebounceTimer;
    }).distinctUntilChanged();

    videos$ = this.studyLanguage$.combineLatest(this.categoryFilter$, this.query$)
        .switchMap(([lang, filter, query]: [LanguageCode, CategoryFilter, string]) => {
            return this.loadMoreVideos$.startWith(null).distinctUntilChanged().concatMap((maxId?: number) => {
                this.hasCompletedInitialLoad = true;

                let search = new URLSearchParams();

                if (filter.value && filter.type === 'Subcategory') {
                    search.set('subcategory_id', filter.value.toString());
                }

                else if (filter.value && filter.type === 'Category') {
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
            }, (_, videos: Videos) => videos.records).do(this.updateMaxVideoId.bind(this)).scan(this.concatVideos, []);
        });

    videos: Videos;
    videoSearchParams: URLSearchParams = new URLSearchParams();

    protected subscriptions: Subscription[] = [];

    private debounceTimer   = new TimerObservable(300);
    private noDebounceTimer = new TimerObservable(0);

    @HostListener('document:mousedown', ['$event']) onMouseDown(e: MouseEvent) {
        if (!this.showDropdown$.getValue()) {
            return;
        }

        let found = false;
        let path: any[] = (<any>e).path;

        for (let i = 0; i < path.length; i++) {
            if (path[i].tagName && path[i].tagName.toLowerCase() === 'gn-category-list') {
                found = true;
                break;
            }
        }

        this.showDropdown$.next(found);
    }

    constructor(protected logger: Logger, protected http: HttpService, protected navbar: NavbarService, protected user: UserService) {
    }

    onClickResetDropdownSelection(): void {
        this.logger.debug(this, 'onClickResetDropdownSelection()');
        this.filterByCategory$.next({text: 'All videos', value: null, type: null});
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
