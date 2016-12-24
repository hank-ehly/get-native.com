/**
 * navbar.component
 * get-native.com
 *
 * Created by henryehly on 2016/11/06.
 */

import { Component, OnInit, Input, trigger, transition, animate, keyframes, style } from '@angular/core';
import { Location } from '@angular/common';

import { LoginService, NavbarService } from '../../core/index';

import { Logger } from 'angular2-logger/core';

@Component({
    moduleId: module.id,
    selector: 'gn-navbar',
    templateUrl: 'navbar.component.html',
    styleUrls: ['navbar.component.css'],
    animations: [
        trigger('bounceInOut', [
            transition(':enter', [
                animate(100, keyframes([
                    style({transform: 'scale(0.9)', offset: 0}),
                    style({transform: 'scale(1.3)', offset: 0.7}),
                    style({transform: 'scale(1)', offset: 1.0})
                ]))
            ]),
            transition(':leave', [
                animate(100, keyframes([
                    style({transform: 'scale(1)', offset: 0}),
                    style({transform: 'scale(1.3)', offset: 0.7}),
                    style({transform: 'scale(0.9)', offset: 1.0})
                ]))
            ])
        ])
    ]
})
export class NavbarComponent implements OnInit {
    @Input() authenticated: boolean;
    title: string;
    backButtonTitle: string;
    logoLinkPath: string;
    isNotificationIndicatorVisible: boolean = true;

    constructor(private loginService: LoginService,
                private logger: Logger,
                private navbarService: NavbarService,
                private location: Location) {
    }

    ngOnInit(): void {
        this.navbarService.setTitle$.subscribe((t) => this.title = t);
        this.navbarService.setBackButton$.subscribe(t => this.backButtonTitle = t);
        this.logoLinkPath = this.authenticated ? 'dashboard' : '';
    }

    onShowLoginModal(event: any): void {
        this.logger.debug(`[${this.constructor.name}]: requestShowLoginModal()`);
        event.preventDefault();
        this.loginService.showModal();
    }

    /* MOCK */
    toggleNotificationIndicator() {
        this.isNotificationIndicatorVisible = !this.isNotificationIndicatorVisible;
    }

    onClickBack(): void {
        this.logger.debug(`[${this.constructor.name}]: onClickBack()`);
        this.location.back();
    }
}
