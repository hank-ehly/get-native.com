/**
 * navbar.component
 * getnative.org
 *
 * Created by henryehly on 2016/11/06.
 */

import { Component, OnInit, Input, OnDestroy, HostListener } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';

import { QueueButtonState } from '../../core/navbar/queue-button-state';
import { NavbarService } from '../../core/navbar/navbar.service';
import { UserService } from '../../core/user/user.service';
import { DOMService } from '../../core/dom/dom.service';
import { Logger } from '../../core/logger/logger';
import { User } from '../../core/entities/user';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/do';
import * as _ from 'lodash';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { LoginModalService } from '../../login/login-modal.service';
import { LoginComponent } from '../../login/login.component';

const animations = [
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
    trigger('fadeIn', [
        transition(':enter', [
            style({opacity: 0}),
            animate('500ms ease', style({opacity: 1}))
        ])
    ])
];

@Component({
    selector: 'gn-navbar',
    templateUrl: 'navbar.component.html',
    styleUrls: ['navbar.component.scss'],
    animations: animations
})
export class NavbarComponent implements OnInit, OnDestroy {

    @Input() authenticated: boolean;
    @Input() showSearchIcon: boolean;

    title: string;
    backButtonTitle$     = this.navbar.backButtonTitle$;
    queueButtonState$    = this.navbar.queueButtonState$;
    studyOptionsVisible$ = this.navbar.studyOptionsVisible$;
    progressBarVisibleEmitted$ = this.navbar.progressBarVisibleEmitted$;
    searchBarVisible$    = this.navbar.searchBarVisible$.share();
    displayNotificationDropdown$ = new BehaviorSubject<boolean>(false);
    OnDestroy$           = new Subject<void>();
    bsModalRef: BsModalRef;

    pictureUrl$ = new BehaviorSubject<string>(
        'https://storage.googleapis.com/getnative.org/assets/images/silhouette-avatar.jpg'
    );

    queueButtonSaveState = QueueButtonState.SAVE;
    queueButtonRemoveState = QueueButtonState.REMOVE;

    hasUnreadNotifications = false;
    settingsLinkImgSrc = 'https://storage.googleapis.com/getnative.org/assets/images/silhouette-avatar.jpg';

    @HostListener('document:mousedown', ['$event']) onMouseDown(e: MouseEvent) {
        let found = false;
        const path = this.dom.pathForMouseEvent(e);

        if (path) {
            for (let i = 0; i < path.length; i++) {
                if (path[i].className && path[i].className.indexOf('navbar__menu-icon--activity') !== -1) {
                    return;
                } else if (path[i].tagName && path[i].tagName.toLowerCase() === 'gn-activity-dropdown') {
                    found = true;
                    break;
                }
            }
        }

        this.displayNotificationDropdown$.next(found);
    }

    get isQueueButtonDefaultState(): boolean {
        return this.queueButtonState$.getValue() === QueueButtonState.DEFAULT;
    }

    constructor(private logger: Logger, private navbar: NavbarService, private location: Location, private router: Router,
                private dom: DOMService, private user: UserService, private loginModal: LoginModalService,
                private modalService: BsModalService) {
    }

    ngOnInit(): void {
        const navigationEnd$ = this.router.events
            .takeUntil(this.OnDestroy$)
            .filter((e: any) => e instanceof NavigationEnd);

        navigationEnd$
            .mapTo(false)
            .subscribe(this.navbar.searchBarVisible$);

        navigationEnd$
            .mapTo('')
            .subscribe(this.navbar.query$);

        this.user.current$
            .takeUntil(this.OnDestroy$)
            .filter((user: User) => _.has(user, 'picture_url'))
            .pluck('picture_url')
            .subscribe(this.pictureUrl$);

        this.navbar.title$
            .takeUntil(this.OnDestroy$)
            .subscribe(t => this.title = t);

        this.loginModal.closeEmitted.takeUntil(this.OnDestroy$).subscribe(this.onCloseLoginModal.bind(this));
    }

    ngOnDestroy(): void {
        this.logger.debug(this, 'OnDestroy');
        this.OnDestroy$.next();
    }

    updateQuery(e: Event): void {
        const target = <HTMLInputElement>e.target;
        this.navbar.updateQuery(target.value);
    }

    onClickOpenLoginModal(): void {
        this.bsModalRef = this.modalService.show(LoginComponent);
    }

    onCloseLoginModal(): void {
        this.logger.debug(this, 'onCloseLoginModal', this.bsModalRef);
        if (this.bsModalRef) {
            this.bsModalRef.hide();
        }
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

    toggleNotificationDropdown(): void {
        this.displayNotificationDropdown$.next(!this.displayNotificationDropdown$.getValue());
    }

    onClickSeeAllActivity(): void {
        this.displayNotificationDropdown$.next(false);
        this.router.navigate(['/settings/activity']);
    }

}
