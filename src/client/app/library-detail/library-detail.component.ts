/**
 * library-detail.component
 * get-native.com
 *
 * Created by henryehly on 2016/12/05.
 */

import { Component, OnInit } from '@angular/core';

import { NavbarService, Logger, MockHTTPClient, Video } from '../core/index';

import '../operators';

@Component({
    moduleId: module.id,
    selector: 'gn-library-detail',
    templateUrl: 'library-detail.component.html',
    styleUrls: ['library-detail.component.css']
})
export class LibraryDetailComponent implements OnInit {
    video: Video;

    constructor(private logger: Logger, private navbar: NavbarService, private api: MockHTTPClient) {
    }

    ngOnInit() {
        this.logger.debug(`[${this.constructor.name}]: ngOnInit()`);

        this.api.GET_video(1).subscribe((video: Video) => {
            this.navbar.setTitle(video.topic.name);
            this.video = video;
        });
    }
}
