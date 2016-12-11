/**
 * switch.component
 * get-native.com
 *
 * Created by henryehly on 2016/12/11.
 */

import { Component, OnInit, trigger, state, style, transition, animate, keyframes } from '@angular/core';

import { Logger } from 'angular2-logger/core';

const $shamrock    = '#33CC99';
const $regent_grey = '#8F9AA6';

@Component({
    moduleId: module.id,
    selector: 'gn-switch',
    templateUrl: 'switch.component.html',
    styleUrls: ['switch.component.css'],
    animations: [
        trigger('state', [
            state('true', style({transform: 'translateX(20px)', background: $shamrock})),
            transition('0 => 1', [
                animate(100, keyframes([
                    style({transform: 'translateX(0)', background: $regent_grey, offset: 0}),
                    style({transform: 'translateX(3px)', offset: 0.3}),
                    style({transform: 'translateX(25px)', offset: 0.6}),
                    style({transform: 'translateX(20px)', background: $shamrock, offset: 1})
                ]))
            ]),

            state('false', style({transform: 'translateX(0)', background: $regent_grey})),
            transition('1 => 0', [
                animate(100, keyframes([
                    style({transform: 'translateX(20px)', background: $shamrock, offset: 0}),
                    style({transform: 'translateX(15px)', offset: 0.3}),
                    style({transform: 'translateX(-3px)', offset: 0.6}),
                    style({transform: 'translateX(0)', background: $regent_grey, offset: 1}),
                ]))
            ])
        ])
    ]
})
export class SwitchComponent implements OnInit {
    title: string = 'OFF';
    isOn: boolean = false;

    constructor(private logger: Logger) {
    }

    ngOnInit() {
    }

    onToggleState(): void {
        this.isOn = !this.isOn;
    }
}
