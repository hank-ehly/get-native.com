/**
 * library-detail.component
 * get-native.com
 *
 * Created by henryehly on 2016/12/05.
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NavbarService, Logger, Video, APIHandle, HttpService } from '../core/index';

import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';

@Component({
    moduleId: module.id,
    selector: 'gn-library-detail',
    templateUrl: 'library-detail.component.html',
    styleUrls: ['library-detail.component.css']
})
export class LibraryDetailComponent implements OnInit, OnDestroy {
    video: Video;

    private subscriptions: Subscription[] = [];

    constructor(private logger: Logger, private navbar: NavbarService, private http: HttpService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.logger.debug(this, 'ngOnInit()');

        let id = +this.route.snapshot.params['id'];

        this.subscriptions.push(
            this.http.request(APIHandle.VIDEO, {params: {id: id}})
                .subscribe(this.onVideoResponse.bind(this))
        );
    }

    ngOnDestroy(): void {
        this.logger.debug(this, 'ngOnDestroy - Unsubscribe all', this.subscriptions);
        for (let subscription of this.subscriptions) {
            subscription.unsubscribe();
        }
    }

    onVideoResponse(video: Video): void {
        this.navbar.setTitle(video.topic.name);
        this.video = video;
    }

    onToggleLike() {
        this.logger.debug(this, 'onToggleLike()');

        let subscription: Subscription = null;

        if (this.video.liked) {
            this.video.like_count -= 1;
            subscription = this.http.request(APIHandle.UNLIKE_VIDEO, {params: {id: this.video.id}}).subscribe();
        } else {
            this.video.like_count += 1;
            subscription = this.http.request(APIHandle.LIKE_VIDEO, {params: {id: this.video.id}}).subscribe();
        }

        this.video.liked = !this.video.liked;
        this.subscriptions.push(subscription);
    }
}
