/**
 * library.component
 * get-native.com
 *
 * Created by henryehly on 2016/12/05.
 */

import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

import { VideoSearchComponent } from '../shared/video-search/video-search.component';
import { Logger } from '../core/logger/logger';
import { HttpService } from '../core/http/http.service';
import { NavbarService } from '../core/navbar/navbar.service';
import { CategoryListService } from '../core/category-list/category-list.service';
import { APIHandle } from '../core/http/api-handle';

import '../operators';
import { UserService } from '../core/user/user.service';

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
export class LibraryComponent extends VideoSearchComponent implements OnInit {
    constructor(protected logger: Logger, protected http: HttpService, protected navbar: NavbarService,
                protected categoryList: CategoryListService, protected user: UserService) {
        super(logger, http, navbar, categoryList, user);

        this.apiHandle = APIHandle.VIDEOS;
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.logger.debug(this, 'ngOnInit()');

        // todo: get language dynamically
        this.videoSearchParams.set('lang', 'en');
        this.lang$.next('en');
    }
}
