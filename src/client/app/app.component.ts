/**
 * app.component
 * get-native.com
 *
 * Created by henryehly on 2016/11/08.
 */

import { Component, OnInit, HostListener } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import {
    LocalStorageService,
    kAcceptLocalStorage,
    NavbarService,
    Logger,
    LocalStorageItem,
    kAuthToken,
    LocalStorageProtocol,
    AuthService
} from './core/index';

import './operators';
import { ToolbarService } from './core/toolbar/toolbar.service';
import { kAuthTokenExpire } from './core/local-storage/local-storage-keys';

@Component({
    moduleId: module.id,
    selector: 'gn-app',
    templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit, LocalStorageProtocol {
    showComplianceDialog: boolean;
    showLoginModal: boolean = false;
    authenticated: boolean = false;

    constructor(private logger: Logger,
                private localStorage: LocalStorageService,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private navbar: NavbarService,
                private titleService: Title,
                private auth: AuthService,
                private toolbar: ToolbarService) {
    }

    @HostListener('window:storage', ['$event']) onStorageEvent(e: StorageEvent) {
        this.localStorage.broadcastStorageEvent(e);
    }

    ngOnInit(): void {
        this.logger.info(`[${this.constructor.name}] ngOnInit()`);

        this.authenticated = this.auth.isLoggedIn();

        this.showComplianceDialog = !this.localStorage.getItem(kAcceptLocalStorage);

        this.localStorage.setItem$.subscribe(this.didSetLocalStorageItem.bind(this));
        this.localStorage.storageEvent$.subscribe(this.didReceiveStorageEvent.bind(this));
        this.localStorage.clearSource$.subscribe(this.didClearStorage.bind(this));

        this.toolbar.logout$.subscribe(this.onToolbarClickLogout.bind(this));

        /* Dynamically set the navbar title */
        this.router.events
            .filter(e => e instanceof NavigationEnd)
            .map(() => this.activatedRoute)
            .map(route => {
                while (route.firstChild) route = route.firstChild;
                return route;
            })
            .filter(route => route.outlet === 'primary')
            .mergeMap(route => route.data)
            .subscribe(e => {
                this.logger.debug('NavigationEnd:', e);

                if (e.hasOwnProperty('title') && e['title']) {
                    if (this.authenticated) {
                        this.navbar.setTitle(e['title']);
                    }

                    this.titleService.setTitle(`Get Native | ${e['title']}`);
                }
            });
    }

    didSetLocalStorageItem(item: LocalStorageItem): void {
        if (item.key === kAuthToken) {
            this.authenticated = this.auth.isLoggedIn();
            if (!this.authenticated) this.router.navigate(['']);
        }
    }

    didClearStorage(): void {
        this.authenticated = this.auth.isLoggedIn();
        if (!this.authenticated) this.router.navigate(['']);
    }

    didReceiveStorageEvent(event: StorageEvent): void {
        if (event.key === kAuthToken) {
            this.authenticated = this.auth.isLoggedIn();
            if (!this.authenticated) this.router.navigate(['']);
        }
    }

    private onToolbarClickLogout(): void {
        this.localStorage.removeItem(kAuthTokenExpire);
        this.localStorage.removeItem(kAuthToken);
    }
}
