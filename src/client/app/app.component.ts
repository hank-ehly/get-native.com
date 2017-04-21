/**
 * app.component
 * get-native.com
 *
 * Created by henryehly on 2016/11/08.
 */

import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { LocalStorageProtocol } from './core/local-storage/local-storage-protocol';
import { Logger } from './core/logger/logger';
import { LocalStorageService } from './core/local-storage/local-storage.service';
import { NavbarService } from './core/navbar/navbar.service';
import { kAcceptLocalStorage, kAuthToken } from './core/local-storage/local-storage-keys';
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
export class AppComponent implements OnInit, LocalStorageProtocol, OnDestroy {
    showComplianceDialog: boolean;
    showLoginModal: boolean = false;
    authenticated: boolean = false;

    private subscriptions: Subscription[] = [];

    constructor(private logger: Logger, private localStorage: LocalStorageService, private router: Router,
                private activatedRoute: ActivatedRoute, private navbar: NavbarService, private titleService: Title,
                private user: UserService) {
    }

    @HostListener('window:storage', ['$event']) onStorageEvent(e: StorageEvent) {
        this.localStorage.broadcastStorageEvent(e);
    }

    ngOnInit(): void {
        this.logger.info(this, 'OnInit');
        this.updateLoginStatus();

        this.showComplianceDialog = !this.localStorage.getItem(kAcceptLocalStorage);

        let routeDataObservable = this.router.events
            .filter(e => e instanceof NavigationEnd)
            .map(() => this.activatedRoute).map(route => {
                while (route.firstChild) route = route.firstChild;
                return route;
            }).filter(route => route.outlet === 'primary')
            .mergeMap(route => route.data);

        this.subscriptions.push(
            this.localStorage.setItem$.subscribe(this.didSetLocalStorageItem.bind(this)),
            this.localStorage.storageEvent$.subscribe(this.didReceiveStorageEvent.bind(this)),
            this.localStorage.clearSource$.subscribe(this.didClearStorage.bind(this)),
            routeDataObservable.subscribe(this.onNavigationEnd.bind(this))
        );
    }

    ngOnDestroy(): void {
        this.logger.debug(this, 'OnDestroy');
        _.each(this.subscriptions, s => s.unsubscribe());
    }

    // todo: Use Observable
    didSetLocalStorageItem(item: LocalStorageItem): void {
        if (item.key === kAuthToken) {
            this.updateLoginStatus(true);
        }
    }

    // todo: Use Observable
    didClearStorage(): void {
        this.updateLoginStatus(true);
    }

    // todo: Use Observable
    didReceiveStorageEvent(event: StorageEvent): void {
        if (event.key === kAuthToken) {
            this.updateLoginStatus(true);
        }
    }

    private onNavigationEnd(e: any) {
        this.logger.debug(this, 'NavigationEnd', e);

        if (e && e['title']) {
            if (this.authenticated) this.navbar.title$.next(e['title']);
            this.titleService.setTitle(`Get Native | ${e['title']}`);
        }
    }

    // todo: Use Observable
    private updateLoginStatus(triggerNavigation: boolean = false): void {
        this.authenticated = this.user.isLoggedIn();

        this.logger.debug(this, `Login status - ${this.authenticated}`);

        if (this.authenticated) {
            return;
        }

        if (!triggerNavigation) {
            return;
        }

        // todo: This doesn't allow you to specify the address in the browser if you aren't logged in
        // Don't navigation to '' if it's an unprotected route
        // Now, when you 'logout' nothing happens. Make sure to go back to the home page after you logout
        this.router.navigate(['']).then(() => {
            this.logger.info(this, 'Forced navigation to homepage.');
        });
    }
}
