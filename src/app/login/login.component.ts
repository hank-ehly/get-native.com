/**
 * login.component
 * getnativelearning.com
 *
 * Created by henryehly on 2016/11/13.
 */

import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { LoginModalService } from './login-modal.service';
import { DOMService } from '../core/dom/dom.service';
import { Logger } from '../core/logger/logger';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

@Component({
    selector: 'gn-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

    OnDestroy$ = new Subject<void>();
    activeView: string;

    constructor(private logger: Logger, private loginModal: LoginModalService, private router: Router, private dom: DOMService) {
    }

    ngOnInit(): void {
        this.logger.debug(this, 'OnInit');
        this.dom.enableScroll(false);
        this.loginModal.setActiveViewEmitted.takeUntil(this.OnDestroy$).subscribe((view: any) => this.activeView = view);
    }

    ngOnDestroy(): void {
        this.logger.debug(this, 'OnDestroy');
        this.dom.enableScroll(true);
        this.OnDestroy$.next();
    }

    onCloseModal(): void {
        this.logger.debug(this, 'onCloseModal');
        this.loginModal.close();
    }

    @HostListener('document:keydown', ['$event']) onKeyDown(e: KeyboardEvent): void {
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
        this.logger.debug(this, 'onKeydownEscape');
        this.router.navigate([{outlets: {modal: null}}]);
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
