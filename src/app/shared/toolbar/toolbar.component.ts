/**
 * core.module
 * get-native.com
 *
 * Created by henryehly on 2016/11/06.
 */

import { Component } from '@angular/core';
import { trigger, transition, style, animate, keyframes } from '@angular/animations';

import { Language } from '../../core/typings/language';
import { UserService } from '../../core/user/user.service';
import { Languages } from '../../core/lang/languages';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/observable/of';

@Component({

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
    language$  = Observable.of<Language[]>(Languages);
    isTooltipVisible$ = new BehaviorSubject<boolean>(false);

    currentStudyLanguageName$ = this.user.currentStudyLanguage$.pluck('name');

    constructor(public user: UserService) {
    }

    logout(): void {
        this.user.logout();
    }

    setCurrentStudyLanguage(language: Language): void {
        this.user.currentStudyLanguage$.next(language);
    }
}
