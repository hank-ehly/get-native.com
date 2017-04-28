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

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
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
    likedChange$ = new Subject<boolean>();
    liked: boolean;

    likeCount: number;

    subscriptions: Subscription[] = [];

    video$ = this.route.params.pluck('id').map(_.toNumber).switchMap(id => {
        return this.http.request(APIHandle.VIDEO, {
            params: {
                id: id
            }
        });
    }).share().do((v: Video) => {
        this.likeCount = v.like_count;
        this.liked = v.liked;
    });

    constructor(private logger: Logger, private navbar: NavbarService, private http: HttpService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.logger.debug(this, 'OnInit');

        this.navbar.backButtonTitle$.next('Back to Library');
        this.navbar.studyOptionsVisible$.next(true);

        this.subscriptions.push(
            this.video$.pluck('subcategory', 'name').subscribe((t: string) => this.navbar.title$.next(t)),

            this.likedChange$.filter(_.isBoolean)
                .do(this.updateLikeCount.bind(this))
                .do(this.updateLiked.bind(this))
                .debounceTime(300).distinctUntilChanged().mergeMap(liked => {
                return this.http.request(liked ? APIHandle.LIKE_VIDEO : APIHandle.UNLIKE_VIDEO, {
                    params: {
                        id: _.toNumber(this.route.snapshot.params['id'])
                    }
                });
            }).subscribe()
        );
    }

    ngOnDestroy(): void {
        this.logger.debug(this, 'OnDestroy');

        this.navbar.studyOptionsVisible$.next(false);
        this.navbar.backButtonTitle$.next(null);

        _.each(this.subscriptions, s => s.unsubscribe());
    }

    private updateLikeCount(liked: boolean) {
        this.likeCount = liked ? this.likeCount + 1 : this.likeCount - 1;
    }

    private updateLiked(liked: boolean) {
        this.liked = liked;
    }
}
