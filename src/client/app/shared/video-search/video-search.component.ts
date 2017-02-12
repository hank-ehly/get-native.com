/**
 * video-search.component
 * get-native.com
 *
 * Created by henryehly on 2017/02/11.
 */

import { Component, OnInit, HostListener } from '@angular/core';
import { URLSearchParams } from '@angular/http';

import {
    Logger, Videos, Categories, APIHandle, HttpService, NavbarService, Category, Topic, ToolbarService, Language, CategoryListService,
    LangCode, Entity
} from '../../core/index';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import '../../operators';

@Component({
    template: ''
})
export class VideoSearchComponent implements OnInit {
    categories: Categories;
    dropdownSelection: string;
    isDropdownVisible: boolean = false;
    apiHandle: APIHandle = APIHandle.VIDEOS;

    videos: Videos;
    videoSearchParams: URLSearchParams = new URLSearchParams();

    protected query$    = new Subject<string>();
    protected lang$     = new Subject<LangCode>();
    protected category$ = new Subject<string>();
    protected topic$    = new Subject<string>();
    protected maxId$    = new Subject<string>();

    @HostListener('document:mousedown', ['$event']) onMouseDown(e: MouseEvent) {
        if (!this.isDropdownVisible) {
            return;
        }

        let found = false;
        let path: any[] = (<any>e).path;

        for (let i = 0; i < path.length; i++) {
            if (path[i].tagName && path[i].tagName.toLowerCase() === 'gn-category-list') {
                found = true; break;
            }
        }

        this.isDropdownVisible = found;
    }

    constructor(protected logger: Logger, protected http: HttpService, protected navbar: NavbarService, protected toolbar: ToolbarService,
                protected categoryList: CategoryListService) {
    }

    ngOnInit() {
        this.logger.debug(this, 'ngOnInit()');

        this.http.request(APIHandle.CATEGORIES).subscribe((categories: Categories) => this.categories = categories);

        this.navbar.toggleSearchBar$.subscribe(this.onToggleSearchBar.bind(this));
        this.navbar.updateSearchQuery$.subscribe(this.onUpdateSearchQuery.bind(this));

        this.toolbar.selectLanguage$.subscribe(this.onSelectLanguage.bind(this));

        this.categoryList.selectCategory$.subscribe(this.onSelectCategory.bind(this));
        this.categoryList.selectTopic$.subscribe(this.onSelectTopic.bind(this));

        this.query$.debounceTime(300).merge(this.lang$).merge(this.category$).merge(this.topic$).merge(this.maxId$)
            .distinctUntilChanged()
            .switchMap(this.updateVideoSearchResults.bind(this)) // Todo: this could be causing the multiple requests
            .subscribe((videos: Videos) => this.videos = videos);
    }

    onClickShowDropdown(): void {
        this.logger.debug(this, 'onClickShowDropdown()');
        this.isDropdownVisible = !this.isDropdownVisible;
    }

    onClickHideDropdown(): void {
        this.logger.debug(this, 'onClickHideDropdown()');
        this.isDropdownVisible = false;
    }

    onClickResetDropdownSelection(): void {
        this.logger.debug(this, 'onClickResetDropdownSelection()');
        this.dropdownSelection = null;
        this.videoSearchParams.delete('topic_id');
        this.videoSearchParams.delete('category_id');

        this.isDropdownVisible = false;
    }

    onClickLoadMore(): void {
        let oldestVideo = this.videos.records[this.videos.count - 1];
        let updatedCount = +this.videoSearchParams.get('count') * 2;

        this.videoSearchParams.set('max_id', oldestVideo.id_str);
        this.videoSearchParams.set('count', updatedCount.toString());

        this.maxId$.next(oldestVideo.id_str);
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
        this.dropdownSelection = category.name;
        this.videoSearchParams.delete('topic_id');
        this.updateSearchParams('category_id', category.id_str);
        this.category$.next(category.id_str);
    }

    private onSelectTopic(topic: Topic): void {
        this.dropdownSelection = topic.name;
        this.videoSearchParams.delete('category_id');
        this.updateSearchParams('topic_id', topic.id_str);
        this.topic$.next(topic.id_str);
    }

    private updateSearchParams(key: string, value: string): void {
        this.isDropdownVisible = false;

        if (!value) {
            this.videoSearchParams.delete(key);
        } else {
            this.videoSearchParams.set(key, value);
        }
    }

    private updateVideoSearchResults(): Observable<Entity> {
        return this.http.request(this.apiHandle, {search: this.videoSearchParams});
    }
}
