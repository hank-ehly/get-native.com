/**
 * library-detail.component
 * getnativelearning.com
 *
 * Created by henryehly on 2016/12/05.
 */

import { Component, OnInit, OnDestroy, Inject, LOCALE_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { URLSearchParams } from '@angular/http';

import { QueueButtonState } from '../core/navbar/queue-button-state';
import { FacebookService } from '../core/facebook/facebook.service';
import { GNRequestOptions } from '../core/http/gn-request-options';
import { NavbarService } from '../core/navbar/navbar.service';
import { HttpService } from '../core/http/http.service';
import { LangService } from '../core/lang/lang.service';
import { UserService } from '../core/user/user.service';
import { APIHandle } from '../core/http/api-handle';
import { Logger } from '../core/logger/logger';
import { Video } from '../core/entities/video';

import { MetaService } from '@ngx-meta/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/share';
import * as _ from 'lodash';

@Component({
    selector: 'gn-library-detail',
    templateUrl: 'library-detail.component.html',
    styleUrls: ['library-detail.component.scss']
})
export class LibraryDetailComponent implements OnInit, OnDestroy {

    OnDestroy$ = new Subject<void>();
    likedChange$ = new Subject<boolean>();
    liked: boolean;
    queued: boolean;
    videoId: number = _.toNumber(this.route.snapshot.params['id']);
    likeCount: number;
    emailShareHref: string;
    twitterShareHref: string;

    video$: Observable<any> = this.route.params.pluck('id').map(_.toNumber).switchMap(id => {
        const options = {params: {id: id}};
        if (!this.user.isAuthenticated()) {
            const search = new URLSearchParams();
            search.set('lang', this.lang.languageForLocaleId(this.localeId).code);
            _.set(options, 'search', search);
        }
        return this.http.request(APIHandle.VIDEO, options);
    }).share().do((v: Video) => {
        this.liked = v.liked;
        this.likeCount = v.like_count;
    });

    constructor(private logger: Logger, private navbar: NavbarService, private http: HttpService, private route: ActivatedRoute,
                private facebook: FacebookService, private meta: MetaService, private user: UserService, private lang: LangService,
                @Inject(LOCALE_ID) private localeId: string) {
    }

    ngOnInit() {
        this.logger.debug(this, 'OnInit');

        const requestOptions: GNRequestOptions = {
            params: {
                id: this.videoId
            }
        };

        this.navbar.backButtonTitle$.next('Back');
        this.navbar.studyOptionsVisible$.next(true);

        this.video$
            .takeUntil(this.OnDestroy$)
            .pluck('subcategory', 'name')
            .subscribe((t: string) => {
                this.emailShareHref = `mailto:?subject=getnative - ${t}&body=${window.location.href}`;
                this.twitterShareHref = `https://twitter.com/intent/tweet?text=getnative - ${t}&url=${window.location.href}`;
                this.navbar.title$.next(t);
                this.meta.setTitle(t);
            });

        this.likedChange$
            .takeUntil(this.OnDestroy$)
            .filter(_.isBoolean)
            .do(this.updateLikeCount.bind(this))
            .do(this.updateLiked.bind(this))
            .debounceTime(500)
            .distinctUntilChanged()
            .map(liked => liked ? APIHandle.LIKE_VIDEO : APIHandle.UNLIKE_VIDEO)
            .mergeMap(handle => this.http.request(handle, requestOptions))
            .subscribe();

        this.navbar.onClickQueue$
            .takeUntil(this.OnDestroy$)
            .do(() => this.queued = !this.queued)
            .do(() => this.navbar.queueButtonState$.next(QueueButtonState.DEFAULT))
            .map(() => this.queued ? APIHandle.QUEUE_VIDEO : APIHandle.DEQUEUE_VIDEO)
            .mergeMap(handle => this.http.request(handle, requestOptions))
            .map(() => this.queued ? QueueButtonState.REMOVE : QueueButtonState.SAVE)
            .subscribe(this.navbar.queueButtonState$);

        this.video$
            .takeUntil(this.OnDestroy$)
            .pluck('cued')
            .do((cued: boolean) => this.queued = cued)
            .map((cued: boolean) => cued ? QueueButtonState.REMOVE : QueueButtonState.SAVE)
            .subscribe(this.navbar.queueButtonState$);
    }

    ngOnDestroy(): void {
        this.logger.debug(this, 'OnDestroy');
        this.navbar.studyOptionsVisible$.next(false);
        this.navbar.backButtonTitle$.next(null);
        this.navbar.queueButtonState$.next(QueueButtonState.DEFAULT);
        this.OnDestroy$.next();
    }

    onClickShareFacebook(): void {
        this.facebook.share();
    }

    onClickShareTwitter(): void {
        if (this.twitterShareHref) {
            window.open(this.twitterShareHref);
        }
    }

    onClickShareEmail(): void {
        if (this.emailShareHref) {
            window.location.href = this.emailShareHref;
        }
    }

    private updateLikeCount(liked: boolean) {
        this.likeCount = liked ? this.likeCount + 1 : this.likeCount - 1;
    }

    private updateLiked(liked: boolean) {
        this.liked = liked;
    }
}
