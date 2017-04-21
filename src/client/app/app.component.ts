/**
 * app.component
 * get-native.com
 *
 * Created by henryehly on 2016/11/08.
 */

import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Logger } from './core/logger/logger';
import { LocalStorageService } from './core/local-storage/local-storage.service';
import { NavbarService } from './core/navbar/navbar.service';
import { kAcceptLocalStorage, kAuthToken, kCurrentUser, kAuthTokenExpire } from './core/local-storage/local-storage-keys';
import { LocalStorageItem } from './core/local-storage/local-storage-item';
import { UserService } from './core/user/user.service';

import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import * as _ from 'lodash';

@Component({
    moduleId: module.id,
    selector: 'gn-app',
    templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
    showComplianceDialog: boolean;
    showLoginModal: boolean = false;
    authenticated: boolean = false;

    private subscriptions: Subscription[] = [];

    constructor(private logger: Logger, private localStorage: LocalStorageService, private router: Router,
                private activatedRoute: ActivatedRoute, private navbar: NavbarService, private titleService: Title,
                public user: UserService) {
    }

    @HostListener('window:storage', ['$event']) onStorageEvent(e: StorageEvent) {
        this.localStorage.broadcastStorageEvent(e); // what to do about this
    }

    ngOnInit(): void {
        this.logger.info(this, 'OnInit');

        this.showComplianceDialog = !this.localStorage.getItem(kAcceptLocalStorage);

        let routeDataObservable = this.router.events
            .filter(e => e instanceof NavigationEnd)
            .map(() => this.activatedRoute).map(route => {
                while (route.firstChild) route = route.firstChild;
                return route;
            }).filter(route => route.outlet === 'primary')
            .mergeMap(route => route.data);

        this.subscriptions.push(
            routeDataObservable.subscribe(this.onNavigationEnd.bind(this)),

            this.user.logout$.subscribe(() => {
                this.router.navigate(['']).then(() => {
                    this.logger.info(this, `Navigated to ''`);
                });
            })
        );
    }

    ngOnDestroy(): void {
        this.logger.debug(this, 'OnDestroy');
        _.each(this.subscriptions, s => s.unsubscribe());
    }

    private onNavigationEnd(e: any) {
        this.logger.debug(this, 'NavigationEnd', e);

        if (e && e.title) {
            if (this.user.authenticated$.getValue()) this.navbar.title$.next(e['title']);
            this.titleService.setTitle(`Get Native | ${e['title']}`);
        }
    }
}
