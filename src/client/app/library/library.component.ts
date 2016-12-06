/**
 * library.component
 * get-native.com
 *
 * Created by henryehly on 2016/12/05.
 */

import { Component, OnInit } from '@angular/core';

import { NavbarService } from '../core/navbar/navbar.service';

import { Logger } from 'angular2-logger/core';

@Component({
    moduleId: module.id,
    selector: 'gn-library',
    templateUrl: 'library.component.html',
    styleUrls: ['library.component.css']
})

export class LibraryComponent implements OnInit {
    isDropdownVisible: boolean;
    videos: any[];
    categories: any[];

    constructor(private logger: Logger, private navbarService: NavbarService) {
    }

    ngOnInit(): void {
        this.logger.debug('[LibraryComponent]: ngOnInit()');
        this.navbarService.setTitle('Library');

        /* Mock */
        this.videos = [
            {isPlaceholder: false}, {isPlaceholder: false}, {isPlaceholder: false},
            {isPlaceholder: false}, {isPlaceholder: false}, {isPlaceholder: false},
            {isPlaceholder: false}, {isPlaceholder: false}, {isPlaceholder: false},
            {isPlaceholder: false}, {isPlaceholder: false}, {isPlaceholder: false}
        ];

        /* Mock */
        let categoriesArr = [
            {title: 'Business', subcategories: ['Subcategory 1', 'Subcategory 2', 'Subcategory 3']},
            {title: 'Holidays', subcategories: ['Subcategory 1', 'Subcategory 2', 'Subcategory 3']},
            {title: 'Negotiations', subcategories: ['Subcategory 1', 'Subcategory 2']},
            {title: 'Language', subcategories: ['Subcategory 1', 'Subcategory 2']},
            {title: 'Hobbies', subcategories: ['Subcategory 1', 'Subcategory 2', 'Subcategory 3', 'Subcategory 4', 'Subcategory 5']},
            {title: 'Travel', subcategories: ['Subcategory 1', 'Subcategory 2']},
        ];

        /* Move out of component */
        this.categories = categoriesArr.map((e, i) => {
            return i % 3 === 0 ? categoriesArr.slice(i, i + 3) : null;
        }).filter((e) => e);
    }

    onToggleDropdown(): void {
        this.logger.debug(`[LibraryComponent]: onToggleDropdown() -> ${!this.isDropdownVisible}`);
        this.isDropdownVisible = !this.isDropdownVisible;
    }
}
