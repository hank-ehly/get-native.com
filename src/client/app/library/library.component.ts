/**
 * library.component
 * get-native.com
 *
 * Created by henryehly on 2016/12/05.
 */

import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

import { VideoSearchComponent } from '../shared/video-search/video-search.component';
import { Logger } from '../core/logger/logger';
import { HttpService } from '../core/http/http.service';
import { NavbarService } from '../core/navbar/navbar.service';

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
export class LibraryComponent extends VideoSearchComponent {
    constructor(protected logger: Logger, protected http: HttpService, protected navbar: NavbarService, protected user: UserService) {
        super(logger, http, navbar, user);
    }
}
