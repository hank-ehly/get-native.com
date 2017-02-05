/**
 * core.module
 * get-native.com
 *
 * Created by henryehly on 2016/11/06.
 */

import { Component, trigger, transition, style, animate, keyframes } from '@angular/core';

import { Languages, ToolbarService, Language } from '../../core/index';

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
    languages = Languages;

    /* Todo: Which language should be the default selected language? */
    selectedLanguage: Language;

    constructor(private toolbarService: ToolbarService) {
        this.selectedLanguage = this.languages[0];
    }

    onLogout(): void {
        this.toolbarService.logout();
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

    setSelectedLanguage(lang: Language): void {
        if (this.selectedLanguage !== lang) {
            this.selectedLanguage = lang;
            this.toolbarService.didSelectLanguage(lang);
        }
    }
}
