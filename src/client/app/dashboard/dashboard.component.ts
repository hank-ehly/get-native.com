/**
 * dashboard.component
 * get-native.com
 *
 * Created by henryehly on 2016/11/28.
 */

import { Component } from '@angular/core';
import { trigger, style, transition, animate } from '@angular/animations';
import { URLSearchParams } from '@angular/http';

import { VideoSearchComponent } from '../shared/video-search/video-search.component';
import { WritingAnswers } from '../core/entities/writing-answers';
import { Logger } from '../core/logger/logger';
import { HttpService } from '../core/http/http.service';
import { NavbarService } from '../core/navbar/navbar.service';
import { CategoryListService } from '../core/category-list/category-list.service';
import { UTCDateService } from '../core/utc-date/utc-date.service';
import { APIHandle } from '../core/http/api-handle';
import { WritingAnswer } from '../core/entities/writing-answer';
import { UserService } from '../core/user/user.service';
import { LanguageCode } from '../core/typings/language-code';

import * as _ from 'lodash';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/pluck';

@Component({
    moduleId: module.id,
    selector: 'gn-dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.css'],
    animations: [
        trigger('dropdown', [
            transition(':enter', [
                style({opacity: 0, transform: 'translateY(-20px)'}),
                animate('300ms ease', style({opacity: 1, transform: 'translateY(0)'}))
            ]),
            transition(':leave', [
                style({opacity: 1, transform: 'translateY(0)'}),
                animate('300ms ease', style({opacity: 0, transform: 'translateY(-20px)'}))
            ])
        ])
    ]
})
export class DashboardComponent extends VideoSearchComponent {
    maxAnswerId: number = null;

    filterAnswers       = new Subject<number>();
    loadMoreAnswers     = new Subject<number>();
    answerFilterStream$ = this.filterAnswers.startWith(30).distinctUntilChanged();

    answers$ = this.studyLanguage$.combineLatest(this.answerFilterStream$).switchMap(([lang, since]: [LanguageCode, number]) => {
        return this.loadMoreAnswers.startWith(null).distinctUntilChanged().concatMap((maxId?: number) => {
            let search = new URLSearchParams();

            if (since) {
                search.set('since', this.dateService.getDaysAgoFromDate(since).toString());
            }

            if (maxId) {
                search.set('max_id', maxId.toString());
            }

            let options = {
                search: search,
                params: {
                    lang: lang
                }
            };

            return this.http.request(APIHandle.WRITING_ANSWERS, options);
        }, (_, answers: WritingAnswers) => answers.records).do(this.updateMaxAnswerId.bind(this)).scan(this.concatWritingAnswers, []);
    });

    stats$ = this.studyLanguage$.concatMap((lang: LanguageCode) => {
        return this.http.request(APIHandle.STUDY_STATS, {
            params: {
                lang: lang
            }
        });
    });

    answerFilters = [
        {text: 'LAST 30 DAYS', value: 30},
        {text: 'LAST 60 DAYS', value: 60},
        {text: 'LAST YEAR',    value: 365},
        {text: 'ALL TIME',     value: null}
    ];

    constructor(protected logger: Logger, protected http: HttpService, protected navbar: NavbarService, protected user: UserService,
                private dateService: UTCDateService) {
        super(logger, http, navbar, user);
        this.cuedOnly = true;
    }

    private updateMaxAnswerId(records?: WritingAnswer[]): void {
        if (!_.isEmpty(records)) {
            this.maxAnswerId = _.last(records).id;
        }
    }

    private concatWritingAnswers(acc: WritingAnswer[], records: WritingAnswer[]) {
        return records ? _.unionWith(acc, records, _.isEqual) : [];
    }
}
