/**
 * library.component
 * get-native.com
 *
 * Created by henryehly on 2016/12/05.
 */

import { Component, OnInit, trigger, transition, style, animate } from '@angular/core';

import { Logger } from 'angular2-logger/core';
import { Router } from '@angular/router';

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
    isDropdownVisible: boolean;
    videos: any[];
    categories: any[];

    constructor(private logger: Logger, private router: Router) {
    }

    ngOnInit(): void {
        this.logger.debug(`[${this.constructor.name}]: ngOnInit()`);

        /* Mock */
        this.videos = [
            {placeholder: false}, {placeholder: false}, {placeholder: false},
            {placeholder: false}, {placeholder: false}, {placeholder: false},
            {placeholder: false}, {placeholder: false}, {placeholder: false},
            {placeholder: false}, {placeholder: false}, {placeholder: false}
        ];

        /* Mock */
        let categories = [
            {title: 'Business',     subcategories: ['Subcategory 1', 'Subcategory 2', 'Subcategory 3', 'Subcategory 4']},
            {title: 'Holidays',     subcategories: ['Subcategory 1', 'Subcategory 2', 'Subcategory 3']},
            {title: 'Negotiations', subcategories: ['Subcategory 1', 'Subcategory 2']},
            {title: 'Language',     subcategories: ['Subcategory 1', 'Subcategory 2']},
            {title: 'Hobbies',      subcategories: ['Subcategory 1', 'Subcategory 2', 'Subcategory 3', 'Subcategory 4', 'Subcategory 5']},
            {title: 'Travel',       subcategories: ['Subcategory 1', 'Subcategory 2']},
            {title: 'Sports',       subcategories: ['Subcategory 1']}
        ];

        /* TODO: Move out of component */
        let chunkSize = 3;
        this.categories = categories.map((e, i) => {
            return i % chunkSize === 0 ? categories.slice(i, i + 3) : null;
        }).filter((e) => e);

        let surplus = categories.length % 3;
        if (surplus !== 0) {
            let spaceLeft = chunkSize - surplus;

            let i = 0;
            while (i < spaceLeft) {
                let lastIndex = this.categories.length - 1;
                let placeholder = {placeholder: true};
                this.categories[lastIndex].push(placeholder);
                i++;
            }
        }

        this.logger.debug(`[${this.constructor.name}]: Categories: `, this.categories);
    }

    onToggleDropdown(): void {
        this.logger.debug(`[${this.constructor.name}]: onToggleDropdown() -> ${!this.isDropdownVisible}`);
        this.isDropdownVisible = !this.isDropdownVisible;
    }

    onClickVideoPanel(video: any): void {
        this.router.navigate(['library', 1]);
    }
}
