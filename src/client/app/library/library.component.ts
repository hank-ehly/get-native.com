/**
 * library.component
 * get-native.com
 *
 * Created by henryehly on 2016/12/05.
 */

import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

import { Logger, HttpService, NavbarService, ToolbarService, CategoryListService, APIHandle } from '../core/index';
import { VideoSearchComponent } from '../shared/index';

import '../operators';

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
    constructor(protected logger: Logger, protected http: HttpService, protected navbar: NavbarService, protected toolbar: ToolbarService,
                protected categoryList: CategoryListService) {
        super(logger, http, navbar, toolbar, categoryList);

        this.apiHandle = APIHandle.VIDEOS;
    }

    ngOnInit(): void {
        super.ngOnInit();

        this.logger.debug(this, 'ngOnInit()');

        this.videoSearchParams.set('count', '9');
        this.videoSearchParams.set('lang', 'en');
        this.lang$.next('en');
    }
}
