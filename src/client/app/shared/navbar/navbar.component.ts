/**
 * navbar.component
 * get-native.com
 *
 * Created by henryehly on 2016/11/06.
 */

import { Component, OnInit, Input, trigger, transition, animate, style, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { Location } from '@angular/common';

import { LoginModalService, NavbarService, Logger } from '../../core/index';
import { FocusDirective } from '../focus/focus.directive';

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
export class NavbarComponent implements OnInit, OnChanges {
    @Input() authenticated: boolean;
    @ViewChild(FocusDirective) searchBar: FocusDirective;
    title: string;
    searchBarHidden: boolean;
    studyOptionsHidden: boolean;
    progressBarHidden: boolean;
    backButtonTitle: string;
    logoLinkPath: string;
    hasUnreadNotifications: boolean;

    constructor(private loginModal: LoginModalService, private logger: Logger, private navbar: NavbarService, private location: Location) {
        this.searchBarHidden = true;
        this.studyOptionsHidden = true;
        this.progressBarHidden = true;
    }

    ngOnInit(): void {
        this.navbar.setTitle$.subscribe((t) => this.title = t);
        this.navbar.setBackButton$.subscribe(t => this.backButtonTitle = t);
        this.logger.debug(`[${this.constructor.name}] this.authenticated = ${this.authenticated}`);
        this.logoLinkPath = this.authenticated ? 'dashboard' : '';
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.logger.debug(`[${this.constructor.name}] changes`, changes);

        if (changes['authenticated']) {
            this.logoLinkPath = changes['authenticated'].currentValue ? 'dashboard' : '';
        }
    }

    onShowLoginModal(event: any): void {
        this.logger.debug(`[${this.constructor.name}]: requestShowLoginModal()`);
        event.preventDefault();
        this.loginModal.showModal();
    }

    onInputSearchQuery(e: Event): void {
        let query = (<HTMLInputElement>e.target).value;
        this.logger.info(`[${this.constructor.name}] Updating search query to '${query}'`);
        this.navbar.updateSearchQuery(query);
    }

    onClickBack(): void {
        this.logger.debug(`[${this.constructor.name}]: onClickBack()`);
        this.location.back();
    }

    onToggleSearch(): void {
        this.searchBarHidden = !this.searchBarHidden;
        this.logger.debug(`[${this.constructor.name}]: Search bar hidden set to '${this.searchBarHidden}'`);

        /* this.searchBar is not immediately available after becoming 'visible' */
        setTimeout(() => {
            if (!this.searchBarHidden) this.searchBar.focus();
        }, 1);

        this.navbar.didToggleSearchBar(this.searchBarHidden);
    }

    /* MOCK */
    toggleNotificationIndicator(): void {
        this.hasUnreadNotifications = !this.hasUnreadNotifications;
    }
}
