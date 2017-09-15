/**
 * app.component
 * getnativelearning.com
 *
 * Created by henryehly on 2016/11/08.
 */

import { Component, OnInit, HostListener, OnDestroy, HostBinding, LOCALE_ID, Inject } from '@angular/core';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { LocalStorageService } from './core/local-storage/local-storage.service';
import { FacebookService } from './core/facebook/facebook.service';
import { NavbarService } from './core/navbar/navbar.service';
import { environment } from '../environments/environment';
import { HttpService } from './core/http/http.service';
import { LangService } from './core/lang/lang.service';
import { UserService } from './core/user/user.service';
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

@Component({
    selector: 'gn-app',
    templateUrl: 'app.component.html',
    animations: [
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
    ]
})
export class AppComponent implements OnInit, OnDestroy {

    authenticated$ = this.user.authenticated$;
    showToolbar$: Observable<boolean>;
    showNavbarSearchIconEmitted$: Observable<boolean>;
    compliant$ = this.user.compliant$;
    OnDestroy$ = new Subject<void>();
    displayMobileOverlay$ = new Subject<boolean>();

    routeDataEmitted$ = this.router.events.filter(e => e instanceof NavigationEnd).mapTo(this.route).map(route => {
        while (route.firstChild) {
            route = route.firstChild;
        }
        return route;
    }).filter(route => route.outlet === 'primary').mergeMap(route => route.data);

    /* For footer display */
    @HostBinding('style.margin-bottom') get styleMarginBottom(): string {
        return (this.user.isAuthenticated() ? 50 : 240) + 'px';
    }

    @HostBinding('style.display') display = 'block';

    constructor(private logger: Logger, private localStorage: LocalStorageService, private router: Router, private user: UserService,
                private facebook: FacebookService, private route: ActivatedRoute, private lang: LangService, private navbar: NavbarService,
                @Inject(LOCALE_ID) private localeId: string, private http: HttpService) {
        this.showToolbar$ = this.routeDataEmitted$.pluck('showToolbar');
        this.showNavbarSearchIconEmitted$ = this.routeDataEmitted$.pluck('showNavbarSearchIcon');
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

        this.updateUserCacheIfNeeded();
        this.observeInterfaceLanguage();
        this.observeLogout();
        this.initNavbarTitle();

        this.facebook.init({
            appId: environment.facebookAppId,
            autoLogAppEvents: true,
            xfbml: false,
            cookie: false,
            version: 'v2.10'
        });
    }

    ngOnDestroy(): void {
        this.logger.debug(this, 'OnDestroy');
        this.OnDestroy$.next();
    }

    private async onLogout() {
        await this.router.navigate(['']);
    }

    private displayMobileOverlayIfNeeded(): void {
        this.displayMobileOverlay$.next(window.innerWidth < 768);
    }

    private updateUserCacheIfNeeded(): void {
        if (this.user.authenticated$.getValue()) {
            this.http.request(APIHandle.ME).do(this.user.updateCache);
        }
    }

    private observeInterfaceLanguage(): void {
        this.user.current$.takeUntil(this.OnDestroy$).subscribe((u: User) => {
            if (!u || !environment.production || u.interface_language.code === this.lang.languageForLocaleId(this.localeId).code) {
                return;
            }

            const split = window.location.pathname.split('/');
            const pathname = split.slice(2, split.length).join('');

            this.logger.debug(this, pathname);

            window.location.href = window.location.protocol + '//' + [window.location.host, u.interface_language.code, pathname].join('/');
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
            .subscribe(this.navbar.title$);
    }

}
