/**
 * navbar.component
 * get-native.com
 *
 * Created by henryehly on 2016/11/06.
 */

import { Component, OnInit, Input, trigger, transition, animate, keyframes, style } from '@angular/core';
import { Location } from '@angular/common';

import { LoginService, NavbarService, Logger } from '../../core/index';

@Component({
    moduleId: module.id,
    selector: 'gn-navbar',
    templateUrl: 'navbar.component.html',
    styleUrls: ['navbar.component.css'],
    animations: [
        trigger('slideInLeftOutRight', [
            transition(':enter', [
                style({opacity: 0, transform: 'translateX(300px)'}),
                animate('500ms ease', style({opacity: 1, transform: 'translateX(0)'}))
            ]),
            transition(':leave', [
                style({opacity: 1, transform: 'translateX(0)'}),
                animate('400ms ease', style({opacity: 0, transform: 'translateX(300px)'}))
            ])
        ]),
        trigger('slideInRightOutLeft', [
            transition(':enter', [
                style({opacity: 0, transform: 'translateX(-300px)'}),
                animate('500ms ease', style({opacity: 1, transform: 'translateX(0)'}))
            ]),
            transition(':leave', [
                style({opacity: 1, transform: 'translateX(0)'}),
                animate('400ms ease', style({opacity: 0, transform: 'translateX(-300px)'}))
            ])
        ])
    ]
})
export class NavbarComponent implements OnInit {
    @Input() authenticated: boolean;
    title: string;
    searchBarHidden: boolean;
    studyOptionsHidden: boolean;
    progressBarHidden: boolean;
    backButtonTitle: string;
    logoLinkPath: string;
    hasUnreadNotifications: boolean;

    constructor(private loginService: LoginService,
                private logger: Logger,
                private navbarService: NavbarService,
                private location: Location) {
        this.searchBarHidden = true;
        this.studyOptionsHidden = true;
        this.progressBarHidden = true;
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
        this.hasUnreadNotifications = !this.hasUnreadNotifications;
    }

    onClickBack(): void {
        this.logger.debug(`[${this.constructor.name}]: onClickBack()`);
        this.location.back();
    }

    onToggleSearch(): void {
        this.searchBarHidden = !this.searchBarHidden;
    }
}
