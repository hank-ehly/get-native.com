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
import { AuthService } from './core/auth/auth.service';
import { kAcceptLocalStorage, kAuthToken } from './core/local-storage/local-storage-keys';
import { LocalStorageItem } from './core/local-storage/local-storage-item';

import './operators';
import { Subscription } from 'rxjs/Subscription';

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
                private auth: AuthService) {
    }

    @HostListener('window:storage', ['$event']) onStorageEvent(e: StorageEvent) {
        this.localStorage.broadcastStorageEvent(e);
    }

    ngOnInit(): void {
        this.logger.info(this, 'ngOnInit()');

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
        this.logger.debug(this, 'ngOnDestroy - Unsubscribe all', this.subscriptions);
        for (let subscription of this.subscriptions) {
            subscription.unsubscribe();
        }
    }

    didSetLocalStorageItem(item: LocalStorageItem): void {
        if (item.key === kAuthToken) {
            this.updateLoginStatus();
        }
    }

    didClearStorage(): void {
        this.updateLoginStatus();
    }

    didReceiveStorageEvent(event: StorageEvent): void {
        if (event.key === kAuthToken) {
            this.updateLoginStatus();
        }
    }

    private onNavigationEnd(e: any) {
        this.logger.debug(this, 'NavigationEnd', e);

        if (e && e['title']) {
            if (this.authenticated) this.navbar.setTitle(e['title']);
            this.titleService.setTitle(`Get Native | ${e['title']}`);
        }
    }

    private updateLoginStatus(): void {
        this.authenticated = this.auth.isLoggedIn();

        if (this.authenticated) {
            return;
        }

        this.router.navigate(['']).then(() => {
            this.logger.info(this, 'Forced navigation to homepage.');
        });
    }
}
