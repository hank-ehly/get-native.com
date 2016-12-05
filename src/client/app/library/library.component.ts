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

    constructor(private logger: Logger, private navbarService: NavbarService) {
    }

    ngOnInit(): void {
        this.logger.debug('[LibraryComponent]: ngOnInit()');
        this.navbarService.setTitle('Library');
        this.videos = [
            {isPlaceholder: false},
            {isPlaceholder: false},
            {isPlaceholder: false},

            {isPlaceholder: false},
            {isPlaceholder: false},
            {isPlaceholder: false},

            {isPlaceholder: false},
            {isPlaceholder: false},
            {isPlaceholder: false},

            {isPlaceholder: false},
            {isPlaceholder: false},
            {isPlaceholder: false}
        ];
    }

    onToggleDropdown(): void {
        this.logger.debug(`[LibraryComponent]: onToggleDropdown() -> ${!this.isDropdownVisible}`);
        this.isDropdownVisible = !this.isDropdownVisible;
    }
}
