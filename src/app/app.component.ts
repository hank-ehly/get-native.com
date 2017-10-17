/**
 * app.component
 * getnativelearning.com
 *
 * Created by henryehly on 2016/11/08.
 */

import { Component, OnInit, HostListener, OnDestroy, HostBinding, LOCALE_ID, Inject } from '@angular/core';
import { animate, AnimationTriggerMetadata, keyframes, style, transition, trigger } from '@angular/animations';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { LocalStorageService } from './core/local-storage/local-storage.service';
import { FacebookService } from './core/facebook/facebook.service';
import { NavbarService } from './core/navbar/navbar.service';
import { environment } from '../environments/environment';
import { HttpService } from './core/http/http.service';
import { LangService } from './core/lang/lang.service';
import { UserService } from './core/user/user.service';
import { DOMService } from './core/dom/dom.service';
import { APIHandle } from './core/http/api-handle';
import { translateMetaKey } from './meta-factory';
import { Logger } from './core/logger/logger';
import { User } from './core/entities/user';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/map';
import * as moment from 'moment';
import * as _ from 'lodash';

const animations: AnimationTriggerMetadata[] = [
    trigger('enterUpLeaveDown', [
        transition(':enter', [
            animate(300, keyframes([
                style({opacity: 0, transform: 'translateY(100%)', offset: 0}),
                style({opacity: 1, transform: 'translateY(-10px)', offset: 0.7}),
                style({opacity: 1, transform: 'translateY(0)', offset: 1.0})
            ]))
        ]),
        transition(':leave', [
            animate(200, keyframes([
                style({opacity: 1, transform: 'translateY(0)', offset: 0}),
                style({opacity: 1, transform: 'translateY(-10px)', offset: 0.7}),
                style({opacity: 0, transform: 'translateY(100%)', offset: 1.0})
            ]))
        ])
    ])
];

@Component({
    selector: 'gn-app',
    templateUrl: 'app.component.html',
    animations: animations,
    styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

    alertMessage: string;
    authenticated$ = this.user.authenticated$;
    compliant$ = this.user.compliant$;
    displayMobileOverlay$ = new Subject<boolean>();
    flags = {isShowingMobileOverlay: false};
    OnDestroy$ = new Subject<void>();
    routeDataEmitted$: Observable<any>;
    showToolbar$: Observable<boolean>;
    showNavbarSearchIconEmitted$: Observable<boolean>;
    fbConfig = {appId: environment.facebookAppId, autoLogAppEvents: true, xfbml: false, cookie: false, version: 'v2.10'};

    @HostBinding('style.margin-bottom') get styleMarginBottom(): string {
        return (this.user.isAuthenticated() ? 50 : 240) + 'px';
    }

    constructor(private logger: Logger,
                private localStorage: LocalStorageService,
                private router: Router,
                private user: UserService,
                private facebook: FacebookService,
                private route: ActivatedRoute,
                private lang: LangService,
                private navbar: NavbarService,
                @Inject(LOCALE_ID)
                private localeId: string,
                private http: HttpService,
                private dom: DOMService) {
        this.displayMobileOverlay$
            .takeUntil(this.OnDestroy$)
            .subscribe(this.onDisplayMobileOverlayChanged.bind(this));

        this.routeDataEmitted$ = this.router.events
            .takeUntil(this.OnDestroy$)
            .filter(e => e instanceof NavigationEnd)
            .mapTo(this.route)
            .map(r => {
                while (r.firstChild) {
                    r = r.firstChild;
                }
                return r;
            })
            .filter(r => r.outlet === 'primary')
            .mergeMap(r => r.data);

        this.showToolbar$ = this.routeDataEmitted$.pluck('showToolbar');

        this.showNavbarSearchIconEmitted$ = this.routeDataEmitted$.pluck('showNavbarSearchIcon');

        this.dom.alertMessage$.takeUntil(this.OnDestroy$).subscribe((m) => this.alertMessage = m);
    }

    @HostListener('window:storage', ['$event']) onStorageEvent(e: StorageEvent) {
        this.localStorage.broadcastStorageEvent(e);
    }

    @HostListener('window:load') onLoad() {
        this.displayMobileOverlayIfNeeded();
    }

    @HostListener('window:resize') onResize() {
        this.displayMobileOverlayIfNeeded();
    }

    ngOnInit(): void {
        this.logger.debug(this, 'OnInit');

        this.facebook.init(this.fbConfig);
        this.initMoment();
        this.updateUserCacheIfNeeded();
        this.observeInterfaceLanguage();
        this.observeLogout();
        this.initNavbarTitle();
    }

    ngOnDestroy(): void {
        this.logger.debug(this, 'OnDestroy');
        this.OnDestroy$.next();
    }

    private async onLogout() {
        await this.router.navigate(['']);
    }

    private displayMobileOverlayIfNeeded(): void {
        if (this.flags.isShowingMobileOverlay && window.innerWidth >= 768) {
            this.displayMobileOverlay$.next(false);
        } else if (!this.flags.isShowingMobileOverlay && window.innerWidth < 768) {
            this.displayMobileOverlay$.next(true);
        }
    }

    private onDisplayMobileOverlayChanged(display: boolean): void {
        this.dom.enableScroll(!display);
        this.flags.isShowingMobileOverlay = display;
    }

    private updateUserCacheIfNeeded(): void {
        if (this.user.isAuthenticated()) {
            this.http.request(APIHandle.ME).takeUntil(this.OnDestroy$).subscribe((u: User) => {
                this.user.update(u);
            });
        }
    }

    private observeInterfaceLanguage(): void {
        this.user.current$.takeUntil(this.OnDestroy$)
            .filter(() => this.user.isAuthenticated())
            .subscribe((u: User) => {
                if (!u || environment.development || u.interface_language.code === this.lang.languageForLocaleId(this.localeId).code) {
                    return;
                }

                const l = window.location;
                const split = l.pathname.split('/');
                const pathname = split.slice(2, split.length).join('');

                this.logger.debug(this, pathname);

                l.href = l.protocol + '//' + [l.host, u.interface_language.code, pathname].join('/');
            });
    }

    private observeLogout(): void {
        this.user.logout$.takeUntil(this.OnDestroy$).subscribe(this.onLogout.bind(this));
    }

    private initNavbarTitle(): void {
        this.routeDataEmitted$
            .takeUntil(this.OnDestroy$)
            .map((data: any) => data.hideNavbarTitle ? {meta: {title: ''}} : data)
            .pluck('meta', 'title')
            .map((key: string) => translateMetaKey(this.lang.languageForLocaleId(this.localeId).code, key))
            .subscribe(t => this.navbar.title$.next(t));
    }

    private initMoment(): void {
        const defLongDateFormat = {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'YYYY MMMM Do',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd D MMMM YYYY HH:mm'
        };

        moment.locale('ja', {
            longDateFormat: _.assign(defLongDateFormat, {ll: 'YYYY年M月D日'})
        });

        moment.updateLocale('en', {
            longDateFormat: _.assign(defLongDateFormat, {ll: 'D MMM YYYY'})
        });
    }

}
