/**
 * library.component
 * get-native.com
 *
 * Created by henryehly on 2016/12/05.
 */

import { Component, OnInit, trigger, transition, style, animate } from '@angular/core';
import { URLSearchParams } from '@angular/http';

import { Logger, Videos, Categories, APIHandle, HttpService, NavbarService } from '../core/index';
import { Category } from '../core/entities/category';
import { Topic } from '../core/entities/topic';

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
        if (query !== '') {
            this.search.set('q', query);
        }

        this.onUpdateSearchParams();
    }

    onToggleDropdown(): void {
        this.logger.debug(`[${this.constructor.name}]: onToggleDropdown() -> ${!this.isDropdownVisible}`);
        this.isDropdownVisible = !this.isDropdownVisible;
    }

    onSelectCategory(category: Category): void {
        this.search.delete('topic_id');
        this.search.set('category_id', category.id_str);
        this.onUpdateSearchParams();
    }

    onSelectTopic(topic: Topic): void {
        this.search.delete('category_id');
        this.search.set('topic_id', topic.id_str);
        this.onUpdateSearchParams();
    }

    onUpdateSearchParams(): void {
        this.http.request(APIHandle.VIDEOS, {search: this.search}).subscribe((videos: Videos) => this.videos = videos);
    }
}
