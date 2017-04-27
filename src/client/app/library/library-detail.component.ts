/**
 * library-detail.component
 * get-native.com
 *
 * Created by henryehly on 2016/12/05.
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Video } from '../core/entities/video';
import { Logger } from '../core/logger/logger';
import { NavbarService } from '../core/navbar/navbar.service';
import { HttpService } from '../core/http/http.service';
import { APIHandle } from '../core/http/api-handle';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { NextObserver } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/pluck';

import * as _ from 'lodash';

@Component({
    moduleId: module.id,
    selector: 'gn-library-detail',
    templateUrl: 'library-detail.component.html',
    styleUrls: ['library-detail.component.css']
})
export class LibraryDetailComponent implements OnInit, OnDestroy {
    video$: Observable<Video>;

    liked$ = new BehaviorSubject<boolean>(null);

    likeCount: number;

    reqOptions = {
        params: {
            id: +this.route.snapshot.params['id']
        }
    };

    constructor(private logger: Logger, private navbar: NavbarService, private http: HttpService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.logger.debug(this, 'OnInit');

        this.video$ = this.http.request(APIHandle.VIDEO, this.reqOptions).share().do((v: Video) => {
            this.likeCount = v.like_count;
        });

        this.video$.pluck('subcategory', 'name').subscribe(this.navbar.title$);

        this.liked$.filter(_.isBoolean).do(this.updateLikeCount.bind(this)).debounceTime(300).distinctUntilChanged().subscribe(
            <NextObserver<boolean>>this.onLikedChange.bind(this)
        );
    }

    ngOnDestroy(): void {
        this.logger.debug(this, 'OnDestroy');
    }

    private onLikedChange(liked: boolean) {
        this.logger.debug(this, 'liked change', liked);
        this.http.request(liked ? APIHandle.LIKE_VIDEO : APIHandle.UNLIKE_VIDEO, this.reqOptions);
    }

    private updateLikeCount(liked: boolean) {
        this.likeCount = liked ? this.likeCount + 1 : this.likeCount - 1;
    }
}
