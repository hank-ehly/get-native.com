/**
 * navbar.component
 * get-native.com
 *
 * Created by henryehly on 2016/11/06.
 */

import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations';
import { Location } from '@angular/common';

import { LoginModalService } from '../../core/login-modal/login-modal.service';
import { NavbarService } from '../../core/navbar/navbar.service';
import { Logger } from '../../core/logger/logger';
import { FocusDirective } from '../focus/focus.directive';

import { Subscription } from 'rxjs/Subscription';

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
export class NavbarComponent implements OnInit, OnDestroy {
    @Input() authenticated: boolean;
    @ViewChild(FocusDirective) searchBar: FocusDirective;
    title: string;
    searchBarHidden: boolean;
    studyOptionsHidden: boolean;
    progressBarHidden: boolean;
    backButtonTitle: string;
    hasUnreadNotifications: boolean;

    private subscriptions: Subscription[] = [];

    constructor(private loginModal: LoginModalService, private logger: Logger, private navbar: NavbarService, private location: Location) {
        this.searchBarHidden = true;
        this.studyOptionsHidden = true;
        this.progressBarHidden = true;
    }

    ngOnInit(): void {
        this.subscriptions.push(
            this.navbar.setTitle$.subscribe((t) => this.title = t),
            this.navbar.setBackButton$.subscribe(t => this.backButtonTitle = t)
        );

        this.logger.debug(this, `this.authenticated = ${this.authenticated}`);
    }

    ngOnDestroy(): void {
        this.logger.debug(this, 'ngOnDestroy - Unsubscribe all', this.subscriptions);
        for (let subscription of this.subscriptions) {
            subscription.unsubscribe();
        }
    }

    onShowLoginModal(event: any): void {
        this.logger.debug(this, 'requestShowLoginModal()');
        event.preventDefault();
        this.loginModal.showModal();
    }

    onInputSearchQuery(e: Event): void {
        let query = (<HTMLInputElement>e.target).value;
        this.logger.info(this, `Updating search query to '${query}'`);
        this.navbar.updateSearchQuery(query);
    }

    onClickBack(): void {
        this.logger.debug(this, 'onClickBack()');
        this.location.back();
    }

    onToggleSearch(): void {
        this.searchBarHidden = !this.searchBarHidden;
        this.logger.debug(this, `Search bar hidden set to '${this.searchBarHidden}'`);

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
