/**
 * library-detail.component
 * get-native.com
 *
 * Created by henryehly on 2016/12/05.
 */

import { Component, OnInit } from '@angular/core';

import { NavbarService, Logger } from '../core/index';

@Component({
    moduleId: module.id,
    selector: 'gn-library-detail',
    templateUrl: 'library-detail.component.html',
    styleUrls: ['library-detail.component.css']
})
export class LibraryDetailComponent implements OnInit {
    videos: any[];

    constructor(private logger: Logger, private navbar: NavbarService) {
    }

    ngOnInit() {
        this.logger.debug('[LibraryComponent]: ngOnInit()');

        /* Todo (Mock) */
        this.navbar.setTitle('Library Detail');

        /* Todo (Mock) */
        this.videos = [{placeholder: false}, {placeholder: false}, {placeholder: true}];
    }
}
