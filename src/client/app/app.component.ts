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
    LocalStorageProtocol
} from './core/index';

import './operators';

@Component({
    moduleId: module.id,
    selector: 'gn-app',
    templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit, LocalStorageProtocol {
    showComplianceDialog: boolean;
    showLoginModal: boolean;
    authenticated: boolean;

    constructor(private logger: Logger,
                private localStorageService: LocalStorageService,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private navbar: NavbarService,
                private titleService: Title) {
        this.authenticated = false;
        this.showLoginModal = false;
    }

    @HostListener('window:storage', ['$event']) onStorageEvent(e: StorageEvent) {
        this.localStorageService.broadcastStorageEvent(e);
    }

    ngOnInit(): void {
        this.showComplianceDialog = !this.localStorageService.getItem(kAcceptLocalStorage);

        // Todo: See if you can use 'super()' somehow to get rid of this.
        this.localStorageService.setItem$.subscribe(this.didSetLocalStorageItem.bind(this));
        this.localStorageService.storageEvent$.subscribe(this.didReceiveStorageEvent.bind(this));
        this.localStorageService.clearSource$.subscribe(this.didClearStorage.bind(this));

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
            this.handleAuthTokenChange(item.data);
        }
    }

    didClearStorage(): void {
        this.handleAuthTokenChange();
    }

    didReceiveStorageEvent(event: StorageEvent): void {
        if (event.key === kAuthToken) {
            this.handleAuthTokenChange(event.newValue);
        }
    }

    handleAuthTokenChange(token?: string) {
        if (token) {
            this.logger.info(`[${this.constructor.name}] Auth token has been updated.`);
            this.authenticated = true;
        } else {
            this.logger.debug(`[${this.constructor.name}] Auth token is null. Transitioning to logout state.`);
            this.authenticated = false;
            this.router.navigate(['']).then(() => {
                this.logger.info(`[${this.constructor.name}] Transition to logout state complete.`);
            });
        }
    }
}
