/**
 * app.component
 * get-native.com
 *
 * Created by henryehly on 2016/11/08.
 */

import { Component, OnInit, HostListener, OnDestroy, HostBinding } from '@angular/core';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { LocalStorageService } from './core/local-storage/local-storage.service';
import { FacebookService } from './core/facebook/facebook.service';
import { NavbarService } from './core/navbar/navbar.service';
import { environment } from '../environments/environment';
import { UserService } from './core/user/user.service';
import { Logger } from './core/logger/logger';

import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import * as _ from 'lodash';

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
    compliant$ = this.user.compliant$;

    metaTitleEmitted$ = this.router.events
        .filter(e => e instanceof NavigationEnd)
        .mapTo(this.route)
        .map(route => {
            while (route.firstChild) {
                route = route.firstChild;
            }
            return route;
        })
        .filter(route => route.outlet === 'primary')
        .mergeMap(route => route.data)
        .map(data => data.meta.title);

    /* For footer display */
    @HostBinding('style.margin-bottom') get styleMarginBottom(): string {
        return (this.user.isAuthenticated() ? 50 : 240) + 'px';
    }

    @HostBinding('style.display') display = 'block';

    private subscriptions: Subscription[] = [];

    constructor(private logger: Logger, private localStorage: LocalStorageService, private router: Router, private user: UserService,
                private navbar: NavbarService, private facebook: FacebookService, private route: ActivatedRoute) {
    }

    @HostListener('window:storage', ['$event']) onStorageEvent(e: StorageEvent) {
        this.localStorage.broadcastStorageEvent(e); // what to do about this
    }

    ngOnInit(): void {
        this.logger.debug(this, 'OnInit');

        this.user.authenticated$.next(this.user.isAuthenticated());

        this.subscriptions.push(
            this.metaTitleEmitted$.subscribe(t => {
                if (t && t.length) {
                    this.navbar.title$.next(t);
                }
            }),
            this.user.logout$.subscribe(this.onLogout.bind(this))
        );

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
        _.invokeMap(this.subscriptions, 'unsubscribe');
    }

    private async onLogout() {
        await this.router.navigate(['']);
    }
}
