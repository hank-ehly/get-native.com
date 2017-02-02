/**
 * library.component
 * get-native.com
 *
 * Created by henryehly on 2016/12/05.
 */

import { Component, OnInit, trigger, transition, style, animate } from '@angular/core';
import { URLSearchParams } from '@angular/http';

import { Logger, Videos, Categories, APIHandle, HttpService, NavbarService, Category, Topic } from '../core/index';

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
export class LibraryComponent implements OnInit {
    videos: Videos;
    categories: Categories;
    isDropdownVisible: boolean;
    search: URLSearchParams;
    dropdownSelection: string;

    constructor(private logger: Logger, private http: HttpService, private navbar: NavbarService) {
        this.isDropdownVisible = false;
        this.search = new URLSearchParams();
    }

    ngOnInit(): void {
        this.logger.debug(`[${this.constructor.name}]: ngOnInit()`);
        this.http.request(APIHandle.CATEGORIES).subscribe((categories: Categories) => this.categories = categories);
        this.http.request(APIHandle.VIDEOS).subscribe((videos: Videos) => this.videos = videos);
        this.navbar.updateSearchQuery$.subscribe(this.onSearchQueryChange.bind(this));
    }

    onSearchQueryChange(query: string) {
        let trimmedQuery = query.trim();

        if (trimmedQuery) {
            this.search.set('q', trimmedQuery);
        } else {
            this.search.delete('q');
        }

        this.onUpdateSearchParams();
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
        this.onUpdateSearchParams();
    }

    onSelectCategory(category: Category): void {
        this.search.delete('topic_id');
        this.search.set('category_id', category.id_str);
        this.dropdownSelection = category.name;
        this.onUpdateSearchParams();
    }

    onSelectTopic(topic: Topic): void {
        this.search.delete('category_id');
        this.search.set('topic_id', topic.id_str);
        this.dropdownSelection = topic.name;
        this.onUpdateSearchParams();
    }

    onUpdateSearchParams(): void {
        this.isDropdownVisible = false;
        this.http.request(APIHandle.VIDEOS, {search: this.search}).subscribe((videos: Videos) => this.videos = videos);
    }
}
