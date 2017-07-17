/**
 * navbar.component
 * get-native.com
 *
 * Created by henryehly on 2016/11/06.
 */

import { trigger, transition, animate, style } from '@angular/animations';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';

import { LoginModalService } from '../../core/login-modal/login-modal.service';
import { NavbarService } from '../../core/navbar/navbar.service';
import { Logger } from '../../core/logger/logger';

import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/do';
import * as _ from 'lodash';

@Component({
    selector: 'gn-navbar',
    templateUrl: 'navbar.component.html',
    styleUrls: ['navbar.component.scss'],
    animations: [
        trigger('slideInLeftOutRight', [
            transition(':enter', [
                style({opacity: 0, transform: 'translateX(300px)'}),
                animate('500ms ease', style({opacity: 1, transform: 'none'}))
            ]),
            transition(':leave', [
                style({opacity: 1, transform: 'none'}),
                animate('400ms ease', style({opacity: 0, transform: 'translateX(300px)'}))
            ])
        ]),
        trigger('fadeInOut', [
            transition(':enter', [
                style({opacity: 0}),
                animate('500ms ease', style({opacity: 1}))
            ]),
            transition(':leave', [
                style({opacity: 1}),
                animate('400ms ease', style({opacity: 0}))
            ])
        ])
    ]
})
export class NavbarComponent implements OnInit, OnDestroy {
    @Input() authenticated: boolean;

    title$               = this.navbar.title$;
    backButtonTitle$     = this.navbar.backButtonTitle$;
    queueButtonTitle$    = this.navbar.queueButtonTitle$;
    studyOptionsVisible$ = this.navbar.studyOptionsVisible$;
    studyOptionsEnabled$ = this.navbar.studyOptionsEnabled$;
    progressBarVisibleEmitted$ = this.navbar.progressBarVisibleEmitted$;
    searchBarVisible$    = this.navbar.searchBarVisible$.share();
    displayMagnifyingGlassEmitted$ = this.navbar.displayMagnifyingGlassEmitted$.share();
    progress             = this.navbar.progress;

    hasUnreadNotifications = false;

    private subscriptions: Subscription[] = [];

    constructor(private loginModal: LoginModalService, private logger: Logger, private navbar: NavbarService, private location: Location,
                private router: Router) {
    }

    ngOnInit(): void {
        this.subscriptions.push(
            this.router.events.filter((e: any) => e instanceof NavigationEnd).do(() => {
                this.navbar.searchBarVisible$.next(false);
            }).map(_.stubString).subscribe(this.navbar.query$)
        );
    }

    ngOnDestroy(): void {
        this.logger.debug(this, 'OnDestroy', this.subscriptions);
        _.each(this.subscriptions, s => s.unsubscribe());
    }

    updateQuery(e: Event): void {
        const target = <HTMLInputElement>e.target;
        this.navbar.updateQuery(target.value);
    }

    onShowLoginModal(e: any): void {
        e.preventDefault();
        this.logger.debug(this, 'onShowLoginModal');
        this.loginModal.showModal();
    }

    onClickBack(): void {
        this.logger.debug(this, 'onClickBack');
        this.location.back();
    }

    onClickSearch(): void {
        this.navbar.searchBarVisible$.next(true);
    }

    onClickCloseSearch(): void {
        this.navbar.searchBarVisible$.next(false);
    }

    onClickStart(): void {
        this.logger.debug(this, 'onClickStart');
        this.navbar.onClickStart$.next();
    }

    onClickQueue(): void {
        this.logger.debug(this, 'onClickQueue');
        this.navbar.onClickQueue$.next();
    }

    /* MOCK */
    toggleNotificationIndicator(): void {
        this.hasUnreadNotifications = !this.hasUnreadNotifications;
    }
}
