/**
 * core.module
 * get-native.com
 *
 * Created by henryehly on 2016/11/06.
 */

import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate, keyframes } from '@angular/animations';

import { Language } from '../../core/typings/language';
import { ToolbarService } from '../../core/toolbar/toolbar.service';
import { UserService } from '../../core/user/user.service';
import { Languages } from '../../core/lang/languages';
import { Logger } from '../../core/logger/logger';

import * as _ from 'lodash';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

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
export class ToolbarComponent implements OnInit {
    languageStream$         = Observable.of<Language[]>(Languages);

    isVisibleStream$        = new BehaviorSubject<boolean>(false);
    selectedLanguageStream$ = new BehaviorSubject<Language>(_.first(Languages));

    constructor(private toolbarService: ToolbarService, private user: UserService, private logger: Logger) {
    }

    ngOnInit(): void {
        this.logger.debug(this, 'OnInit');
        // this.user.defaultStudyLanguage.then(l => this.selectedLanguage = l);
    }

    setSelectedLanguage(language: Language): void {
        this.toolbarService.didSelectLanguage(language);
    }

    onLogout(): void {
        this.toolbarService.logout();
    }
}
