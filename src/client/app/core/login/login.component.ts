/**
 * login.component
 * get-native.com
 *
 * Created by henryehly on 2016/11/13.
 */

import { Component, style, keyframes, animate, transition, trigger, Input, OnInit } from '@angular/core';

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

    onSetModalView(view: any) {
        /* TODO: Make sure view isn't some weird string */
        this.modalView = view;
    }
}
