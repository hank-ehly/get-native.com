/**
 * dashboard.component
 * get-native.com
 *
 * Created by henryehly on 2016/11/28.
 */

import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'gn-dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    videos: any[];

    constructor() {
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
    }
}
