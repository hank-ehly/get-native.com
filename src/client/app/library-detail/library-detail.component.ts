/**
 * library-detail.component
 * get-native.com
 *
 * Created by henryehly on 2016/12/05.
 */

import { Component, OnInit } from '@angular/core';

import { NavbarService, Logger, Video, APIHandle } from '../core/index';
import { HttpService } from '../core/http/http.service';

import '../operators';

@Component({
    moduleId: module.id,
    selector: 'gn-library-detail',
    templateUrl: 'library-detail.component.html',
    styleUrls: ['library-detail.component.css']
})
export class LibraryDetailComponent implements OnInit {
    video: Video;

    constructor(private logger: Logger, private navbar: NavbarService, private http: HttpService) {
    }

    ngOnInit() {
        this.logger.debug(`[${this.constructor.name}]: ngOnInit()`);

        // Todo: Get id from url
        this.http.request(APIHandle.VIDEO, {id: 1}).subscribe((video: Video) => {
            this.navbar.setTitle(video.topic.name);
            this.video = video;
        });
    }

    onClickLike() {
        this.logger.debug(`[${this.constructor.name}]: onClickLike()`);

        // Todo: Get id from url
        this.http.request(APIHandle.LIKE_VIDEO, {id: 1}).subscribe();
    }

    onClickUnlike() {
        this.logger.debug(`[${this.constructor.name}]: onClickUnlike()`);

        // Todo: Get id from url
        this.http.request(APIHandle.UNLIKE_VIDEO, {id: 1}).subscribe();
    }
}
