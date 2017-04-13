/**
 * dashboard.component
 * get-native.com
 *
 * Created by henryehly on 2016/11/28.
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, style, transition, animate } from '@angular/animations';
import { URLSearchParams } from '@angular/http';

import { VideoSearchComponent } from '../shared/video-search/video-search.component';
import { WritingAnswers } from '../core/entities/writing-answers';
import { Logger } from '../core/logger/logger';
import { HttpService } from '../core/http/http.service';
import { NavbarService } from '../core/navbar/navbar.service';
import { ToolbarService } from '../core/toolbar/toolbar.service';
import { CategoryListService } from '../core/category-list/category-list.service';
import { UTCDateService } from '../core/utc-date/utc-date.service';
import { APIHandle } from '../core/http/api-handle';
import { WritingAnswer } from '../core/entities/writing-answer';

import * as _ from 'lodash';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/do';

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
export class DashboardComponent extends VideoSearchComponent implements OnInit, OnDestroy {
    stats: any;

    maxAnswerId: number = null;

    filterAnswers       = new Subject<number>();
    loadMoreAnswers     = new Subject<number>();
    answerFilterStream$ = this.filterAnswers.startWith(30).distinctUntilChanged();

    answerStream$ = this.answerFilterStream$.switchMap((since?: number) => {
        return this.loadMoreAnswers.startWith(null).distinctUntilChanged().concatMap((maxId?: number) => {
            let search = new URLSearchParams();

            if (since) {
                search.set('since', this.dateService.getDaysAgoFromDate(since).toString());
            }

            if (maxId) {
                search.set('max_id', maxId.toString());
            }

            const options = {
                search: search
            };

            return this.http.request(APIHandle.WRITING_ANSWERS, options);
        }, (_, answers: WritingAnswers) => answers.records).do(this.updateMaxAnswerId.bind(this)).scan(this.concatWritingAnswers, []);
    });

    answerFilters = [
        {text: 'LAST 30 DAYS', value: 30},
        {text: 'LAST 60 DAYS', value: 60},
        {text: 'LAST YEAR',    value: 365},
        {text: 'ALL TIME',     value: null}
    ];

    constructor(protected logger: Logger, protected http: HttpService, protected navbar: NavbarService, protected toolbar: ToolbarService,
                protected categoryList: CategoryListService, private dateService: UTCDateService) {
        super(logger, http, navbar, toolbar, categoryList);
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.logger.debug(this, 'ngOnInit()');

        this.subscriptions.push(this.subscribeToStudyStats());

        this.videoSearchParams.set('cued_only', 'true');

        // todo: get current language dynamically
        this.videoSearchParams.set('lang', 'en');

        // todo: redundant. make something like a 'trigger request' function or something..
        this.lang$.next('en');
    }

    ngOnDestroy(): void {
        _.forEach(this.subscriptions, s => s.unsubscribe());
    }

    // todo: get current lang
    private subscribeToStudyStats(): Subscription {
        const options = {
            params: {
                lang: 'en'
            }
        };

        return this.http.request(APIHandle.STUDY_STATS, options).subscribe((s: any) => {
            this.stats = s;
        });
    }

    private updateMaxAnswerId(records?: WritingAnswer[]): void {
        if (!_.isEmpty(records)) {
            this.maxAnswerId = _.last(records).id;
        }
    }

    private concatWritingAnswers(acc: WritingAnswer[], records: WritingAnswer[]) {
        return records ? _.concat(acc, records) : [];
    }
}
