/**
 * compliance.component
 * get-native.com
 *
 * Created by henryehly on 2016/11/11.
 */

import { Component, trigger, keyframes, style, animate, transition, Input, OnInit, OnDestroy } from '@angular/core';

import { LocalStorageService, kAcceptLocalStorage, LocalStorageProtocol, LocalStorageItem, Logger } from '../../core/index';

import { Subscription } from 'rxjs/Subscription';

@Component({
    moduleId: module.id,
    selector: 'gn-compliance',
    templateUrl: 'compliance.component.html',
    styleUrls: ['compliance.component.css'],
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
export class ComplianceComponent implements OnInit, LocalStorageProtocol, OnDestroy {
    @Input() isVisible: boolean;

    private subscriptions: Subscription[] = [];

    constructor(private logger: Logger, private localStorageService: LocalStorageService) {
    }

    ngOnInit(): void {
        this.subscriptions.push(
            this.localStorageService.setItem$.subscribe(this.didSetLocalStorageItem.bind(this)),
            this.localStorageService.storageEvent$.subscribe(this.didReceiveStorageEvent.bind(this)),
            this.localStorageService.clearSource$.subscribe(this.didClearStorage.bind(this))
        );
    }

    ngOnDestroy(): void {
        this.logger.debug(this, 'ngOnDestroy - Unsubscribe all', this.subscriptions);
        for (let subscription of this.subscriptions) {
            subscription.unsubscribe();
        }
    }

    didSetLocalStorageItem(item: LocalStorageItem): void {
        if (item['key'] !== kAcceptLocalStorage) return;

        let isCompliant = item['data'];
        this.logger.debug(this, `localStorageValueChanged(${isCompliant})`);
        this.isVisible = !isCompliant;
    }

    didReceiveStorageEvent(e: StorageEvent): void {
        if (e.key !== kAcceptLocalStorage) return;

        let isCompliant = e.newValue === 'true';
        this.logger.debug(this, 'didReceiveStorageEvent()', e);
        this.isVisible = !isCompliant;
    }

    didClearStorage(): void {
        this.isVisible = true;
    }

    onClose(): void {
        this.logger.debug(this, 'onClose()');
        this.localStorageService.setItem(kAcceptLocalStorage, true);
    }
}
