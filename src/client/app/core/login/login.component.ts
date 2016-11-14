/**
 * login.component
 * get-native.com
 *
 * Created by henryehly on 2016/11/13.
 */

import { Component, Output, EventEmitter, style, keyframes, animate, transition, trigger } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'gn-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css'],
    animations: [

        /* TODO: Because the overlay contains the modal, the 'darken' effects are affecting the 'present' effects */
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
        trigger('present', [
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

export class LoginComponent {
    @Output() closeLoginModal = new EventEmitter();
    isVisible: boolean = false;

    // TODO: Find 'event' type
    onHideLoginModal(event: any): void {
        if (['click-off-overlay', 'close-button', 'close-button-img'].indexOf(event.target.className) !== -1) {
            console.log('Close');
            this.closeLoginModal.emit();
        }
    }
}
