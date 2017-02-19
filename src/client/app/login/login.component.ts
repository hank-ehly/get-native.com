/**
 * login.component
 * get-native.com
 *
 * Created by henryehly on 2016/11/13.
 */

import { Component, style, keyframes, animate, transition, trigger, Input, OnInit, HostListener, OnDestroy } from '@angular/core';

import { LoginModalService, Logger } from '../core/index';
import { Subscription } from 'rxjs/Subscription';

@Component({
    moduleId: module.id,
    selector: 'gn-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css'],
    animations: [
        trigger('darken', [
            transition(':enter', [
                animate(200, keyframes([
                    style({opacity: 0, offset: 0}),
                    style({opacity: 1, offset: 0.7}),
                    style({opacity: 1, offset: 1.0})
                ]))
            ]),
            transition(':leave', [
                animate(200, keyframes([
                    style({opacity: 1, offset: 0}),
                    style({opacity: 1, offset: 0.7}),
                    style({opacity: 0, offset: 1.0})
                ]))
            ])
        ]),
        trigger('fadeInOut', [
            transition(':enter', [
                animate(200, keyframes([
                    style({transform: 'scale(0.9)', offset: 0}),
                    style({transform: 'scale(1.025)', offset: 0.7}),
                    style({transform: 'scale(1)', offset: 1.0})
                ]))
            ]),
            transition(':leave', [
                animate(200, keyframes([
                    style({transform: 'scale(1)', offset: 0}),
                    style({transform: 'scale(1.025)', offset: 0.7}),
                    style({transform: 'scale(0.9)', offset: 1.0})
                ]))
            ])
        ])
    ]
})
export class LoginComponent implements OnInit, OnDestroy {
    @Input() isVisible: boolean;
    activeView: string;

    private subscriptions: Subscription[] = [];

    constructor(private logger: Logger, private loginModal: LoginModalService) {
    }

    ngOnInit(): void {
        this.subscriptions.push(
            this.loginModal.showModal$.subscribe(() => this.isVisible = true),
            this.loginModal.hideModal$.subscribe(() => this.isVisible = false),
            this.loginModal.setActiveView$.subscribe((view) => this.activeView = view)
        );
    }

    ngOnDestroy(): void {
        this.logger.debug(this, 'ngOnDestroy - Unsubscribe all', this.subscriptions);
        for (let subscription of this.subscriptions) {
            subscription.unsubscribe();
        }
    }

    onClickClose(e: MouseEvent): void {
        let t = <HTMLElement>e.target;
        if (['overlay', 'modal-frame__close-button'].indexOf(t.className) !== -1) {
            this.isVisible = false;
        }
    }

    @HostListener('document:keydown', ['$event']) onKeyDown(e: KeyboardEvent): void {
        if (!this.isVisible) return;

        this.logger.debug(this, `KeyboardEvent: ${e.key}`);

        switch (e.key) {
            case 'Enter':
                this.onKeydownEnter(e);
                break;
            case 'Escape':
                this.onKeydownEscape(e);
                break;
            case 'Tab':
                this.onKeydownTab(e);
                break;
            default:
                break;
        }
    }

    onKeydownEnter(e?: KeyboardEvent): void {
        let target: HTMLElement = <HTMLElement>e.target;
        if (target.className.indexOf('tabbable') === -1) return;

        this.logger.warn(this, `TODO: Perform action for ${target.tagName.toLowerCase()}.${target.className.replace(' ', '.')}`);
    }

    onKeydownEscape(e?: KeyboardEvent): void {
        this.isVisible = false;
    }

    onKeydownTab(e?: KeyboardEvent): void {
        this.selectNextTabbable(e);
    }

    selectNextTabbable(e?: KeyboardEvent) {
        let tabbables = document.querySelectorAll('.tabbable');
        let first: HTMLElement = <HTMLElement>tabbables[0];
        let last: HTMLElement = <HTMLElement>tabbables[tabbables.length - 1];

        let isFirstSelection: boolean = true;
        for (let i = 0; i < tabbables.length; i++) {
            if (document.activeElement === tabbables[i]) {
                isFirstSelection = false;
                break;
            }
        }

        if (!e.shiftKey && (isFirstSelection || e.target === last)) {
            if (e) e.preventDefault();
            first.focus();
        } else if (e.shiftKey && (isFirstSelection || e.target === first)) {
            if (e) e.preventDefault();
            last.focus();
        }
    }
}
