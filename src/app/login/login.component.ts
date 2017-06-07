/**
 * login.component
 * get-native.com
 *
 * Created by henryehly on 2016/11/13.
 */

import { Component, Input, OnInit, HostListener, OnDestroy } from '@angular/core';

import { LoginModalService } from '../core/login-modal/login-modal.service';
import { Logger } from '../core/logger/logger';

import { Subscription } from 'rxjs/Subscription';
import * as _ from 'lodash';

@Component({
    selector: 'gn-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.scss']
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
            this.loginModal.setActiveView$.subscribe((view: any) => this.activeView = view)
        );
    }

    ngOnDestroy(): void {
        this.logger.debug(this, 'ngOnDestroy - Unsubscribe all', this.subscriptions);
        _.each(this.subscriptions, s => s.unsubscribe());
    }

    onClickClose(e: MouseEvent): void {
        const t = <HTMLElement>e.target;
        if (['overlay', 'modal-frame__close-button'].indexOf(t.className) !== -1) {
            this.isVisible = false;
        }
    }

    @HostListener('document:keydown', ['$event']) onKeyDown(e: KeyboardEvent): void {
        if (!this.isVisible) {
            return;
        }

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
        const target: HTMLElement = <HTMLElement>e.target;
        if (target.className.indexOf('tabbable') === -1) {
            return;
        }

        this.logger.warn(this, `TODO: Perform action for ${target.tagName.toLowerCase()}.${target.className.replace(' ', '.')}`);
    }

    onKeydownEscape(e?: KeyboardEvent): void {
        this.isVisible = false;
    }

    onKeydownTab(e?: KeyboardEvent): void {
        this.selectNextTabbable(e);
    }

    selectNextTabbable(e?: KeyboardEvent) {
        const tabbables = document.querySelectorAll('.tabbable');
        const first: HTMLElement = <HTMLElement>tabbables[0];
        const last: HTMLElement = <HTMLElement>tabbables[tabbables.length - 1];

        let isFirstSelection = true;
        for (let i = 0; i < tabbables.length; i++) {
            if (document.activeElement === tabbables[i]) {
                isFirstSelection = false;
                break;
            }
        }

        if (!e.shiftKey && (isFirstSelection || e.target === last)) {
            if (e) {
                e.preventDefault();
            }
            first.focus();
        } else if (e.shiftKey && (isFirstSelection || e.target === first)) {
            if (e) {
                e.preventDefault();
            }
            last.focus();
        }
    }
}
