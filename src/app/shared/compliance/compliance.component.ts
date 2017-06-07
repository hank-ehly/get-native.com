/**
 * compliance.component
 * get-native.com
 *
 * Created by henryehly on 2016/11/11.
 */

import { Component } from '@angular/core';
import { trigger, keyframes, style, animate, transition } from '@angular/animations';

import { UserService } from '../../core/user/user.service';

@Component({
    selector: 'gn-compliance',
    templateUrl: 'compliance.component.html',
    styleUrls: ['compliance.component.scss'],
    animations: [
        trigger('enterUpLeaveDown', [
            transition(':enter', [
                animate(300, keyframes([
                    style({opacity: 0, transform: 'translateY(100%)', offset: 0}),
                    style({opacity: 1, transform: 'translateY(-10px)', offset: 0.7}),
                    style({opacity: 1, transform: 'translateY(0)', offset: 1.0})
                ]))
            ]),
            transition(':leave', [
                animate(200, keyframes([
                    style({opacity: 1, transform: 'translateY(0)', offset: 0}),
                    style({opacity: 1, transform: 'translateY(-10px)', offset: 0.7}),
                    style({opacity: 0, transform: 'translateY(100%)', offset: 1.0})
                ]))
            ])
        ])
    ]
})
export class ComplianceComponent {
    constructor(public user: UserService) {
    }
}
