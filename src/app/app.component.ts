/**
 * app.component
 * get-native.com
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
import { LangService } from './core/lang/lang.service';
import { UserService } from './core/user/user.service';
import { translateMetaKey } from './meta-factory';
import { Logger } from './core/logger/logger';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

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
                @Inject(LOCALE_ID) private localeId: string) {
        this.showToolbar$ = this.routeDataEmitted$.pluck('showToolbar');
        this.showNavbarSearchIconEmitted$ = this.routeDataEmitted$.pluck('showNavbarSearchIcon');
    }

    @HostListener('window:storage', ['$event']) onStorageEvent(e: StorageEvent) {
        this.localStorage.broadcastStorageEvent(e); // what to do about this
    }

    ngOnInit(): void {
        this.logger.debug(this, 'OnInit');

        this.user.authenticated$.next(this.user.isAuthenticated());

        this.routeDataEmitted$.takeUntil(this.OnDestroy$).map((data: any) => {
            return data.hideNavbarTitle ? {meta: {title: ''}} : data;
        }).pluck('meta', 'title').map((key: string) => {
            return translateMetaKey(this.lang.languageForLocaleId(this.localeId).code, key);
        }).subscribe(this.navbar.title$);

        this.user.logout$.takeUntil(this.OnDestroy$).subscribe(this.onLogout.bind(this));

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
}
