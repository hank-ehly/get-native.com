/**
 * cookie-compliance.component
 * get-native.com
 *
 * Created by henryehly on 2016/11/11.
 */

import { Component, trigger, keyframes, style, animate, transition, Input } from '@angular/core';
import { Logger } from 'angular2-logger/core';

@Component({
    moduleId: module.id,
    selector: 'gn-cookie-compliance',
    templateUrl: 'cookie-compliance.component.html',
    styleUrls: ['cookie-compliance.component.css'],
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

export class CookieComplianceComponent {
    @Input() isVisible: boolean;

    constructor(private logger: Logger) {
    }

    onClose(): void {
        this.logger.debug('[CookieComplianceComponent]: onClose()');
        this.isVisible = false;
    }
}
