/**
 * dashboard.component
 * get-native.com
 *
 * Created by henryehly on 2016/11/28.
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Logger, MockHTTPClient } from '../core/index';
import { CuedVideos } from '../core/entities/cued-videos';

@Component({
    moduleId: module.id,
    selector: 'gn-dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    videos: CuedVideos = {records: [], count: 0};
    answers: any[];

    constructor(private logger: Logger, private router: Router, private http: MockHTTPClient) {
    }

    ngOnInit() {
        this.logger.debug(`[${this.constructor.name}] OnInit()`);

        this.http.GET_cued_videos().subscribe((videos: CuedVideos) => {
            this.videos = videos;
        });

        this.answers = [1, 2, 3, 4, 5];
    }

    onBegin(): void {
        this.router.navigate(['study']);
    }
}
