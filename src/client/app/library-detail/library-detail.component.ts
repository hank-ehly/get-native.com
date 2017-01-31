/**
 * library-detail.component
 * get-native.com
 *
 * Created by henryehly on 2016/12/05.
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { NavbarService, Logger, Video, APIHandle, HttpService } from '../core/index';

import 'rxjs/add/operator/switchMap';

@Component({
    moduleId: module.id,
    selector: 'gn-library-detail',
    templateUrl: 'library-detail.component.html',
    styleUrls: ['library-detail.component.css']
})
export class LibraryDetailComponent implements OnInit {
    video: Video;

    constructor(private logger: Logger, private navbar: NavbarService, private http: HttpService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.logger.debug(`[${this.constructor.name}]: ngOnInit()`);

        let id = +this.route.snapshot.params['id'];
        this.http.request(APIHandle.VIDEO, {id: id}).subscribe((video: Video) => {
            this.navbar.setTitle(video.topic.name);
            this.video = video;
        });
    }

    onToggleLike() {
        this.logger.debug(`[${this.constructor.name}] onToggleLike()`);

        if (this.video.liked) {
            this.video.liked = false;
            this.video.like_count -= 1;
            this.http.request(APIHandle.UNLIKE_VIDEO, {id: this.video.id}).subscribe();
        } else {
            this.video.liked = true;
            this.video.like_count += 1;
            this.http.request(APIHandle.LIKE_VIDEO, {id: this.video.id}).subscribe();
        }
    }
}
