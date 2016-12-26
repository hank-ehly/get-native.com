/**
 * library-detail.component
 * get-native.com
 *
 * Created by henryehly on 2016/12/05.
 */

import { Component, OnInit } from '@angular/core';

import { NavbarService, Logger, MockHTTPClient, VideosShowId, Speaker } from '../core/index';

@Component({
    moduleId: module.id,
    selector: 'gn-library-detail',
    templateUrl: 'library-detail.component.html',
    styleUrls: ['library-detail.component.css']
})
export class LibraryDetailComponent implements OnInit {
    videos: any[];

    description: string;
    views: number;
    speaker: Speaker;
    likes: number;

    /* Todo: Model */
    video: any;

    constructor(private logger: Logger, private navbar: NavbarService, private api: MockHTTPClient) {
        this.description = '';
        this.views = 0;
        this.speaker = new Speaker();
    }

    ngOnInit() {
        this.logger.debug(`[${this.constructor.name}]: ngOnInit()`);

        /* Todo (Mock) */
        this.videos = [{placeholder: false}, {placeholder: false}, {placeholder: true}];

        /* GET https://get-native.com/videos/show.json?id=123456 */
        this.api.getVideosShowId(1).subscribe((r: VideosShowId) => {
            this.navbar.setTitle(r.topic.name);
            this.description = r.description;
            this.speaker = r.speaker;
            this.views = r.loop_count;
            this.likes = r.likes.count;
        });
    }
}
