/**
 * app.component
 * get-native.com
 *
 * Created by henryehly on 2016/11/08.
 */

import { Component, OnInit, HostListener } from '@angular/core';

import { LocalStorageService, kAcceptLocalStorage } from './core/index';

import { Logger } from 'angular2-logger/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

import './operators';
import { NavbarService } from './core/navbar/navbar.service';

@Component({
    moduleId: module.id,
    selector: 'gn-app',
    templateUrl: 'app.component.html'
})

export class AppComponent implements OnInit {
    showComplianceDialog: boolean;
    showLoginModal: boolean;

    authenticated: boolean = false;

    constructor(private logger: Logger,
                private localStorageService: LocalStorageService,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private navbar: NavbarService) {
        this.showLoginModal = false;
    }

    @HostListener('window:storage', ['$event']) onStorageEvent(ev: StorageEvent) {
        this.localStorageService.broadcastStorageEvent(ev);
    }

    ngOnInit(): void {
        this.showComplianceDialog = !this.localStorageService.getItem(kAcceptLocalStorage);

        this.router.events
            .filter(e => e instanceof NavigationEnd)
            .map(() => this.activatedRoute)
            .map(route => {

                /* Traverse children so that we always get the right 'title' */
                while (route.firstChild) {
                    route = route.firstChild;
                }

                this.logger.debug('route:', route, 'route.firstChild:', route.firstChild);
                return route;
            })
            .filter(route => route.outlet === 'primary')
            .mergeMap(route => route.data)
            .subscribe(e => {
                this.logger.debug('NavigationEnd:', e);
                if (e.hasOwnProperty('title')) {
                    this.navbar.setTitle(e['title']);
                }
            });
    }
}
