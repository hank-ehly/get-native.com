/**
 * cookie-compliance.component
 * get-native.com
 *
 * Created by henryehly on 2016/11/11.
 */

import { Component, trigger, keyframes, style, animate, transition, Input, OnInit } from '@angular/core';
import { Logger } from 'angular2-logger/core';

import { LocalStorageService, kAcceptLocalStorage } from '../local-storage/index';
import { LocalStorageProtocol } from '../local-storage/local-storage-protocol';

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

export class CookieComplianceComponent implements OnInit, LocalStorageProtocol {
    @Input() isVisible: boolean;

    constructor(private logger: Logger, private localStorageService: LocalStorageService) {
    }

    ngOnInit(): void {
        this.localStorageService.setItem$.subscribe(this.localStorageValueChanged.bind(this));
    }

    localStorageValueChanged(change: any): void {
        if (change['key'] === null || change['key'] === undefined || change['key'] !== kAcceptLocalStorage) {
            /* TODO: Error service */
            throw new Error('Invalid key.');
        }

        let isCompliant: boolean = change['data'];

        this.logger.debug(`[CookieComplianceComponent]: acceptLocalStorageValueChanged(${isCompliant})`);
        this.isVisible = !isCompliant;
    }

    onClose(): void {
        this.logger.debug('[CookieComplianceComponent]: onClose()');
        this.localStorageService.setItem(kAcceptLocalStorage, true);
    }
}
