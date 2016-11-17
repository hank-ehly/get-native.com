/**
 * login-modal.component
 * get-native.com
 *
 * Created by henryehly on 2016/11/13.
 */

import { Component, style, keyframes, animate, transition, trigger, Input, OnInit } from '@angular/core';

import { Logger } from 'angular2-logger/core';
import { LoginModalService } from './login-modal.service';

@Component({
    moduleId: module.id,
    selector: 'gn-login-modal',
    templateUrl: 'login-modal.component.html',
    styleUrls: ['login-modal.component.css'],
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

export class LoginModalComponent implements OnInit {
    @Input() isVisible: boolean;

    constructor(private logger: Logger, private loginModalService: LoginModalService) {
    }

    ngOnInit(): void {
        this.loginModalService.showModal$.subscribe(() => {
            this.isVisible = true;

            /* TODO: You're not doing this correctly */
            // document.body.style.overflowY = 'scroll';
            // document.body.style.overflowX = 'hidden';
        });
    }

    onClose(): void {
        this.isVisible = false;
        /* TODO: Return overflow to original value */
    }
}
