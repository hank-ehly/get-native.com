/**
 * library-detail.component
 * get-native.com
 *
 * Created by henryehly on 2016/12/05.
 */

import { Component, OnInit } from '@angular/core';

import { NavbarService, Logger, MockHTTPClient, Video, Videos, Speaker, Transcripts } from '../core/index';

@Component({
    moduleId: module.id,
    selector: 'gn-library-detail',
    templateUrl: 'library-detail.component.html',
    styleUrls: ['library-detail.component.css']
})
export class LibraryDetailComponent implements OnInit {
    description: string = '';
    loop_count: number = 0;
    likes_count: number = 0;
    speaker: Speaker = {description: '', name: ''};
    transcripts: Transcripts = {records: [], count: 0};
    related_videos: Videos = {records: [], count: 0};

    constructor(private logger: Logger, private navbar: NavbarService, private api: MockHTTPClient) {
    }

    ngOnInit() {
        this.logger.debug(`[${this.constructor.name}]: ngOnInit()`);

        /* Todo (Mock) */
        // this.related_videos = [{placeholder: false}, {placeholder: false}, {placeholder: true}];

        /* GET https://get-native.com/videos/123456 */
        this.api.getVideosShowId(1).subscribe((video: Video) => {
            this.navbar.setTitle(video.topic.name);
            this.description = video.description;
            this.loop_count = video.loop_count;
            this.likes_count = video.likes_count;
            this.speaker = video.speaker;
            this.transcripts = video.transcripts;
            this.related_videos = video.related_videos;
        });
    }
}
