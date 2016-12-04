/**
 * dashboard.component
 * get-native.com
 *
 * Created by henryehly on 2016/11/28.
 */

import { Component, OnInit } from '@angular/core';

import { NavbarService } from '../core/index';

@Component({
    moduleId: module.id,
    selector: 'gn-dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.css']
})

export class DashboardComponent implements OnInit {
    videos: any[];
    answers: any[];

    constructor(private navbarService: NavbarService) {
    }

    ngOnInit() {
        this.videos = [
            {isPlaceholder: false},
            {isPlaceholder: false},
            {isPlaceholder: false},

            {isPlaceholder: false},
            {isPlaceholder: false},
            {isPlaceholder: true}
        ];
        this.answers = [1, 2, 3, 4, 5];
        this.navbarService.setTitle('Dashboard');
    }
}
