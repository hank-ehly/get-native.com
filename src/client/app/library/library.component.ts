/**
 * library.component
 * get-native.com
 *
 * Created by henryehly on 2016/12/05.
 */

import { Component, OnInit, trigger, transition, style, animate, AfterViewInit } from '@angular/core';
import { URLSearchParams } from '@angular/http';

import {
    Logger, Videos, Categories, APIHandle, HttpService, NavbarService, Category, Topic, ToolbarService, Language, CategoryListService,
    LangCode, Entity
} from '../core/index';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import '../operators';

@Component({
    moduleId: module.id,
    selector: 'gn-library',
    templateUrl: 'library.component.html',
    styleUrls: ['library.component.css'],
    animations: [
        trigger('dropdown', [
            transition(':enter', [
                style({opacity: 0, transform: 'translateY(-20px)'}),
                animate('300ms ease', style({opacity: 1, transform: 'translateY(0)'}))
            ]),
            transition(':leave', [
                style({opacity: 1, transform: 'translateY(0)'}),
                animate('300ms ease', style({opacity: 0, transform: 'translateY(-20px)'}))
            ])
        ])
    ]
})
export class LibraryComponent implements OnInit, AfterViewInit {
    categories: Categories;
    dropdownSelection: string;
    isDropdownVisible: boolean = false;

    videos$: Observable<Videos>;
    search: URLSearchParams = new URLSearchParams();

    private query$    = new Subject<string>();
    private lang$     = new Subject<LangCode>();
    private category$ = new Subject<string>();
    private topic$    = new Subject<string>();

    constructor(private logger: Logger, private http: HttpService, private navbar: NavbarService, private toolbar: ToolbarService,
                private categoryList: CategoryListService) {
    }

    ngOnInit(): void {
        this.logger.debug(`[${this.constructor.name}]: ngOnInit()`);

        this.http.request(APIHandle.CATEGORIES).subscribe((categories: Categories) => this.categories = categories);

        this.navbar.toggleSearchBar$.subscribe(this.onToggleSearchBar.bind(this));
        this.navbar.updateSearchQuery$.subscribe(this.onUpdateSearchQuery.bind(this));

        this.toolbar.selectLanguage$.subscribe(this.onSelectLanguage.bind(this));

        this.categoryList.selectCategory$.subscribe(this.onSelectCategory.bind(this));
        this.categoryList.selectTopic$.subscribe(this.onSelectTopic.bind(this));

        this.videos$ = this.query$.debounceTime(300).merge(this.lang$).merge(this.category$).merge(this.topic$)
            .distinctUntilChanged()
            .switchMap(this.updateVideoSearchResults.bind(this));
    }

    ngAfterViewInit(): void {
        // Todo: Request with default language
        this.search.set('count', '9');
        this.search.set('lang', 'en');
        this.lang$.next('en');
    }

    onClickShowDropdown(): void {
        this.logger.debug(`[${this.constructor.name}]: onClickShowDropdown()`);
        this.isDropdownVisible = !this.isDropdownVisible;
    }

    onClickHideDropdown(): void {
        this.logger.debug(`[${this.constructor.name}]: onClickHideDropdown()`);
        this.isDropdownVisible = false;
    }

    onClickResetDropdownSelection(): void {
        this.logger.debug(`[${this.constructor.name}]: onClickResetDropdownSelection()`);
        this.dropdownSelection = null;
        this.search.delete('topic_id');
        this.search.delete('category_id');

        this.isDropdownVisible = false;
    }

    private onToggleSearchBar(hidden: boolean): void {
        if (hidden) {
            this.onUpdateSearchQuery('');
        }
    }

    private onUpdateSearchQuery(query: string): void {
        this.updateSearchParams('q', query);
        this.query$.next(query);
    }

    private onSelectLanguage(lang: Language): void {
        this.updateSearchParams('lang', lang.code);
        this.lang$.next(lang.code);
    }

    private onSelectCategory(category: Category): void {
        this.search.delete('topic_id');
        this.updateSearchParams('category_id', category.id_str);
        this.category$.next(category.id_str);
    }

    private onSelectTopic(topic: Topic): void {
        this.search.delete('category_id');
        this.updateSearchParams('topic_id', topic.id_str);
        this.topic$.next(topic.id_str);
    }

    private updateSearchParams(key: string, value: string): void {
        this.isDropdownVisible = false;

        if (!value) {
            this.search.delete(key);
        } else {
            this.search.set(key, value);
        }
    }

    private updateVideoSearchResults(): Observable<Entity> {
        return this.http.request(APIHandle.VIDEOS, {search: this.search});
    }
}
