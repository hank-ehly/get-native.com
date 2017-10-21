/**
 * core.module
 * getnativelearning.com
 *
 * Created by henryehly on 2016/11/06.
 */

import { Component } from '@angular/core';
import { trigger, transition, style, animate, keyframes } from '@angular/animations';

import { UserService } from '../../core/user/user.service';
import { Language } from '../../core/typings/language';
import { Languages } from '../../core/lang/languages';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/observable/of';

@Component({
    selector: 'gn-toolbar',
    templateUrl: 'toolbar.component.html',
    styleUrls: ['toolbar.component.scss'],
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

    language$ = Observable.of<Language[]>(Languages);
    isTooltipVisible$ = new BehaviorSubject<boolean>(false);
    authenticated$ = this.user.authenticated$;

    currentStudyLanguageName$ = this.user.currentStudyLanguage$.filter(n => !!n).pluck('name');

    constructor(public user: UserService) {
    }

    onMouseLeaveToolbar(): void {
        this.isTooltipVisible$.next(false);
    }

    onClickLogout(): void {
        this.user.logout();
    }

    onClickLanguage(language: Language): void {
        this.user.setCurrentStudyLanguage(language);
    }

    onClickSelectedLanguageLabel(): void {
        this.isTooltipVisible$.next(!this.isTooltipVisible$.getValue());
    }

    onMouseEnterSelectedLanguageLabel(): void {
        this.isTooltipVisible$.next(true);
    }

}
