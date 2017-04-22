/**
 * navbar.component
 * get-native.com
 *
 * Created by henryehly on 2016/11/06.
 */

import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations';
import { Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';

import { LoginModalService } from '../../core/login-modal/login-modal.service';
import { NavbarService } from '../../core/navbar/navbar.service';
import { Logger } from '../../core/logger/logger';
import { FocusDirective } from '../focus/focus.directive';

import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';
import * as _ from 'lodash';

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
    @ViewChild(FocusDirective) searchBar: FocusDirective;

    title: string                   = '';
    backButtonTitle: string         = '';
    progressBarHidden: boolean      = true;
    studyOptionsHidden: boolean     = true;

    hasUnreadNotifications: boolean = false;

    private subscriptions: Subscription[] = [];

    constructor(private loginModal: LoginModalService, private logger: Logger, public navbar: NavbarService, private location: Location,
                private router: Router) {
    }

    ngOnInit(): void {
        this.subscriptions.push(
            this.navbar.title$.subscribe((t) => this.title = t),
            this.navbar.backButtonTitle$.subscribe(t => this.backButtonTitle = t),

            this.router.events.filter((e: any) => e instanceof NavigationEnd).do(() => {
                this.navbar.searchBarVisible$.next(false);
            }).mapTo('').subscribe(this.navbar.query$)
        );
    }

    ngOnDestroy(): void {
        this.logger.debug(this, 'OnDestroy', this.subscriptions);
        _.each(this.subscriptions, s => s.unsubscribe());
    }

    onShowLoginModal(e: any): void {
        e.preventDefault();
        this.logger.debug(this, 'requestShowLoginModal');
        this.loginModal.showModal();
    }

    onClickBack(): void {
        this.logger.debug(this, 'onClickBack()');
        this.location.back();
    }

    /* MOCK */
    toggleNotificationIndicator(): void {
        this.hasUnreadNotifications = !this.hasUnreadNotifications;
    }
}
