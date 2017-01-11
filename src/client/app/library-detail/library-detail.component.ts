/**
 * library-detail.component
 * get-native.com
 *
 * Created by henryehly on 2016/12/05.
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NavbarService, Logger, MockHTTPClient, Video, Videos, Speaker, Transcripts } from '../core/index';

import '../operators';

@Component({
    moduleId: module.id,
    selector: 'gn-library-detail',
    templateUrl: 'library-detail.component.html',
    styleUrls: ['library-detail.component.css']
})
export class LibraryDetailComponent implements OnInit {
    description: string      = '';
    loop_count: number       = 0;
    like_count: number       = 0;
    speaker: Speaker         = {description: '', name: ''};
    transcripts: Transcripts = {records: [], count: 0};
    related_videos: Videos   = {records: [], count: 0};
    video_url: string        = '';

    constructor(private logger: Logger, private navbar: NavbarService, private api: MockHTTPClient, private router: Router) {
    }

    ngOnInit() {
        this.logger.debug(`[${this.constructor.name}]: ngOnInit()`);

        /* GET https://get-native.com/videos/123456 */
        this.api.GET_video(1).subscribe((video: Video) => {
            this.navbar.setTitle(video.topic.name);
            this.related_videos = video.related_videos;
            this.description    = video.description;
            this.loop_count     = video.loop_count;
            this.like_count     = video.like_count;
            this.transcripts    = video.transcripts;
            this.video_url      = video.video_url;
            this.speaker        = video.speaker;
        });
    }
}
