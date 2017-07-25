/**
 * app.component
 * get-native.com
 *
 * Created by henryehly on 2016/11/08.
 */

import { Component, OnInit, HostListener, OnDestroy, HostBinding, Inject, LOCALE_ID } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { LocalStorageService } from './core/local-storage/local-storage.service';
import { NavbarService } from './core/navbar/navbar.service';
import { UserService } from './core/user/user.service';
import { Logger } from './core/logger/logger';

import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import * as _ from 'lodash';

@Component({
    selector: 'gn-app',
    templateUrl: 'app.component.html',
    styles: [`
        :host {
            display: block
        }
    `]
})
export class AppComponent implements OnInit, OnDestroy {
    authenticated$ = this.user.authenticated$;

    navbarTitle$ = this.router.events
        .filter(e => e instanceof NavigationEnd)
        .map(() => this.activatedRoute)
        .map(route => {
            while (route.firstChild) {
                route = route.firstChild;
            }
            return route;
        })
        .filter(route => route.outlet === 'primary')
        .mergeMap(route => route.data)
        .map(data => data.title);

    /* For footer display */
    @HostBinding('style.margin-bottom') get styleMarginBottom(): string {
        return (this.user.isAuthenticated() ? 50 : 240) + 'px';
    }

    private subscriptions: Subscription[] = [];

    constructor(private logger: Logger, private localStorage: LocalStorageService, private router: Router,
                private activatedRoute: ActivatedRoute, private titleService: Title, private user: UserService,
                private navbar: NavbarService, @Inject(LOCALE_ID) private localeId: string) {
    }

    @HostListener('window:storage', ['$event']) onStorageEvent(e: StorageEvent) {
        this.localStorage.broadcastStorageEvent(e); // what to do about this
    }

    ngOnInit(): void {
        this.logger.debug(this, 'OnInit');
        this.logger.debug(this, 'LOCALE_ID', this.localeId);

        this.user.authenticated$.next(this.user.isAuthenticated());

        this.subscriptions.push(
            this.navbarTitle$.subscribe(this.navbar.title$),
            this.navbar.title$.filter(_.isString).map(t => `getnative | ${t}`).subscribe(this.titleService.setTitle),
            this.user.logout$.subscribe(this.onLogout.bind(this))
        );
    }

    ngOnDestroy(): void {
        this.logger.debug(this, 'OnDestroy');
        _.invokeMap(this.subscriptions, 'unsubscribe');
    }

    private async onLogout() {
        await this.router.navigate(['']);
    }
}
