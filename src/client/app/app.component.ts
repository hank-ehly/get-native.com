/**
 * app.component
 * get-native.com
 *
 * Created by henryehly on 2016/11/08.
 */

import { Component, OnInit, HostListener } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, Route } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { LocalStorageService, kAcceptLocalStorage } from './core/index';
import { NavbarService } from './core/navbar/navbar.service';

import { Logger } from 'angular2-logger/core';
import './operators';

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
                private navbar: NavbarService,
                private titleService: Title) {
        this.showLoginModal = false;
    }

    @HostListener('window:storage', ['$event']) onStorageEvent(ev: StorageEvent) {
        this.localStorageService.broadcastStorageEvent(ev);
    }

    ngOnInit(): void {
        this.showComplianceDialog = !this.localStorageService.getItem(kAcceptLocalStorage);

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

            /* Todo */
            // this.router.events
            //     .filter(e => e instanceof NavigationEnd)
            //     .map((e) => {
            //         for (let route of this.router.config) {
            //             let searchPath = `/${route.path}`;
            //
            //             if (e.url === searchPath) {
            //                 return route.data['title'];
            //             }
            //         }
            //
            //         return null;
            //     })
            //     .pairwise()
            //     .subscribe(e => {
            //         if (e instanceof Array && e[0]) {
            //             this.navbar.setBackButtonTitle(e[0]);
            //         }
            //     });
    }
}
