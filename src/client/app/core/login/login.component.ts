/**
 * login.component
 * get-native.com
 *
 * Created by henryehly on 2016/11/13.
 */

import { Component, style, keyframes, animate, transition, trigger, Input, OnInit, HostListener } from '@angular/core';

import { Logger } from 'angular2-logger/core';
import { LoginService } from './index';

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

export class LoginComponent implements OnInit {
    @Input() isVisible: boolean;
    modalView: string;

    constructor(private logger: Logger, private loginService: LoginService) {
    }

    ngOnInit(): void {
        this.loginService.showModal$.subscribe(() => {
            this.isVisible = true;

            // Note: Setting the document.body overflow to 'hidden' will inhibit the user from scrolling up and down the
            // page while the overlay is visible; however, it causes an unpleasant 'jump' effect because the scroll-bar
            // disappears when the <body> overflow is set to 'hidden.'
        });
    }

    onClose(e: any): void {
        if (['close-button', 'overlay'].indexOf(e.target.className) !== -1) {
            this.isVisible = false;
        }
    }

    onSetModalView(view: any): void {
        this.modalView = view;
    }

    @HostListener('document:keydown', ['$event']) onKeyDown(e: KeyboardEvent): void {
        if (!this.isVisible) return;

        this.logger.debug(`KeyboardEvent: ${e.key}`);

        switch (e.key) {
            case 'Enter': this.onKeydownEnter(e); break;
            case 'Escape': this.onKeydownEscape(e); break;
            case 'Tab': this.onKeydownTab(e); break;
            default: break;
        }
    }

    onKeydownEnter(e?: KeyboardEvent): void {
        let target: HTMLElement = <HTMLElement>e.target;
        if (target.className.indexOf('tabbable') === -1) return;

        this.logger.warn(`TODO: Perform action for ${target.tagName.toLowerCase()}.${target.className.replace(' ', '.')}`);
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
        for (var i = 0; i < tabbables.length; i++) {
            if (document.activeElement === tabbables[i]) {
                isFirstSelection = false; break;
            }
        }

        if (!e.shiftKey && (isFirstSelection || e.target === last)) {
            e.preventDefault(); first.focus();
        } else if (e.shiftKey && (isFirstSelection || e.target === first)) {
            e.preventDefault(); last.focus();
        }
    }
}
