/**
 * library.component
 * get-native.com
 *
 * Created by henryehly on 2016/12/05.
 */

import { Component, OnInit, trigger, transition, style, animate } from '@angular/core';
import { Router } from '@angular/router';

import { Logger, STUBCategories, Videos, MockHTTPClient } from '../core/index';
import { Video } from '../core/entities/video';

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
    videos: Videos = {records: [], count: 0};
    categories: any[];

    constructor(private logger: Logger, private router: Router, private http: MockHTTPClient) {
    }

    ngOnInit(): void {
        this.logger.debug(`[${this.constructor.name}]: ngOnInit()`);

        this.http.GET_videos().subscribe((videos: Videos) => {
            /* Todo: Move out of component */
            if (videos.count % 3 !== 0) {
                let records: Video[] = videos.records;
                let diff = 3 - (videos.count % 3);
                let i = 0;

                while (i < diff) {
                    records.push({});
                    i++;
                }

                let count = records.length;
                this.videos = {records: records, count: count};
            } else {
                this.videos = videos;
            }
        });

        let categories = STUBCategories;

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
