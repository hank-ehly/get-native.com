/**
 * core.module
 * get-native.com
 *
 * Created by henryehly on 2016/11/06.
 */

import { Component, trigger, transition, style, animate, keyframes } from '@angular/core';

import { Logger, LocalStorageService, kAuthToken, kAuthTokenExpire } from '../../core/index';

@Component({
    moduleId: module.id,
    selector: 'gn-toolbar',
    templateUrl: 'toolbar.component.html',
    styleUrls: ['toolbar.component.css'],
    animations: [
        trigger('enterUpLeaveDown', [
            transition(':enter', [
                animate('300ms ease-in-out', keyframes([
                    style({opacity: 0, transform: 'translateY(15px)', offset: 0}),
                    style({opacity: 0.8, transform: 'translateY(-3px)', offset: 0.3}),
                    style({opacity: 1, transform: 'translateY(0)', offset: 1})
                ]))
            ]),
            transition(':leave', [
                animate('200ms ease-in-out', keyframes([
                    style({opacity: 1, transform: 'translateY(0)', offset: 0}),
                    style({opacity: 0, transform: 'translateY(15px)', offset: 1})
                ]))
            ])
        ])
    ]
})
export class ToolbarComponent {
    isTooltipVisible: boolean;

    /* Todo: Where do you get these languages from? */
    languages: string[] = ['日本語', 'ITALIANO', 'ESPAÑOL', 'ENGLISH'];

    /* Todo: Which language should be the default selected language? */
    selectedLang: string;

    constructor(private logger: Logger, private localStorage: LocalStorageService) {
        this.selectedLang = this.languages[0];
    }

    onLogout(): void {
        this.logger.info(`[${this.constructor.name}]: onLogout()`);
        this.localStorage.removeItem(kAuthToken);
        this.localStorage.removeItem(kAuthTokenExpire);
    }

    onShowTooltip(): void {
        this.isTooltipVisible = true;
    }

    onHideTooltip(): void {
        this.isTooltipVisible = false;
    }

    onToggleTooltip(): void {
        this.isTooltipVisible = !this.isTooltipVisible;
    }

    setSelectedLanguage(lang: string) {
        this.selectedLang = lang;
    }
}
