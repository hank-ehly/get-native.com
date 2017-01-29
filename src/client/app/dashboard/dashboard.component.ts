/**
 * dashboard.component
 * get-native.com
 *
 * Created by henryehly on 2016/11/28.
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Logger, CuedVideos, APIHandle } from '../core/index';
import { HttpService } from '../core/http/http.service';

@Component({
    moduleId: module.id,
    selector: 'gn-dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    videos: CuedVideos;
    answers: any[];
    stats: any;

    constructor(private logger: Logger, private router: Router, private http: HttpService) {
    }

    ngOnInit() {
        this.logger.debug(`[${this.constructor.name}] OnInit()`);
        this.http.request(APIHandle.CUED_VIDEOS).subscribe((videos: CuedVideos) => this.videos = videos);
        this.http.request(APIHandle.STUDY_STATS).subscribe((stats: any) => this.stats = stats);
        this.answers = [1, 2, 3, 4, 5];
    }

    onBegin(): void {
        this.router.navigate(['study']);
    }
}
