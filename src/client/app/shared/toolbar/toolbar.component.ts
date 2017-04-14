/**
 * core.module
 * get-native.com
 *
 * Created by henryehly on 2016/11/06.
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, transition, style, animate, keyframes } from '@angular/animations';

import { Language } from '../../core/typings/language';
import { UserService } from '../../core/user/user.service';
import { Languages } from '../../core/lang/languages';
import { LangService } from '../../core/lang/lang.service';
import { Logger } from '../../core/logger/logger';
import { AuthService } from '../../core/auth/auth.service';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import * as _ from 'lodash';

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
export class ToolbarComponent implements OnInit, OnDestroy {
    languageStream$         = Observable.of<Language[]>(Languages);

    isVisibleStream$        = new BehaviorSubject<boolean>(false);
    selectedLanguageStream$ = new BehaviorSubject<Language>(_.first(Languages));

    private subscriptions: Subscription[] = [];

    constructor(private user: UserService, private logger: Logger, private lang: LangService, private auth: AuthService) {
    }

    ngOnInit(): void {
        this.logger.debug(this, 'OnInit');

        this.subscriptions.push(this.user.current.map(u => this.lang.languageForCode(u.default_study_language_code)).subscribe(l => {
            this.logger.debug(this, 'default study language', l);
            this.selectedLanguageStream$.next(l);
        }));
    }

    ngOnDestroy(): void {
        this.logger.debug(this, 'OnDestroy');
        _.forEach(this.subscriptions, s => s.unsubscribe());
    }

    setSelectedLanguage(language: Language): void {
        this.user.currentStudyLanguage$.next(language);
    }

    onLogout(): void {
        this.auth.logout$.next();
    }
}
