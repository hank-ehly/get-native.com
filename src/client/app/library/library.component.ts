/**
 * library.component
 * get-native.com
 *
 * Created by henryehly on 2016/12/05.
 */

import { Component, OnInit, trigger, transition, style, animate } from '@angular/core';

import { Logger, Videos, MockHTTPClient, Categories } from '../core/index';

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

    constructor(private logger: Logger, private http: MockHTTPClient) {
        this.isDropdownVisible = false;
    }

    ngOnInit(): void {
        this.logger.debug(`[${this.constructor.name}]: ngOnInit()`);

        this.http.GET_videos().subscribe((videos: Videos) => {
            this.videos = videos;
        });

        this.http.GET_categories().subscribe((categories: Categories) => {
            this.categories = categories;
        });
    }

    onToggleDropdown(): void {
        this.logger.debug(`[${this.constructor.name}]: onToggleDropdown() -> ${!this.isDropdownVisible}`);
        this.isDropdownVisible = !this.isDropdownVisible;
    }
}
