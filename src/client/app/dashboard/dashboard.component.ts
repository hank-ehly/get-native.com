/**
 * dashboard.component
 * get-native.com
 *
 * Created by henryehly on 2016/11/28.
 */

import { Component, OnInit } from '@angular/core';
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

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import '../operators';

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
export class DashboardComponent extends VideoSearchComponent implements OnInit {
    stats: any;
    answers: WritingAnswers;
    answerSearchParams: URLSearchParams = new URLSearchParams();

    answersMaxId$ = new Subject<string>();
    answersMenu$ = new Subject<number>();
    answerMenuItems = [
        {text: 'LAST 30 DAYS', value: 30},
        {text: 'LAST 60 DAYS', value: 60},
        {text: 'LAST YEAR', value: 365},
        {text: 'ALL TIME', value: null}
    ];
    activeAnswerMenuItem: any = this.answerMenuItems[0];

    constructor(protected logger: Logger, protected http: HttpService, protected navbar: NavbarService, protected toolbar: ToolbarService,
                protected categoryList: CategoryListService, private dateService: UTCDateService) {
        super(logger, http, navbar, toolbar, categoryList);
    }

    ngOnInit() {
        super.ngOnInit();
        this.logger.debug(this, 'ngOnInit()');

        const statsRequestOptions = {params: {lang: 'en'}};
        const statsObservable = this.http.request(APIHandle.STUDY_STATS, statsRequestOptions);
        const statsSubscription = statsObservable.subscribe(this.onPushStudyStats.bind(this)); // todo: lang
        this.subscriptions.push(statsSubscription);

        const answersMenuObservable = this.answersMenu$.distinctUntilChanged().switchMap(this.updateAnswersFilter.bind(this));
        const answersMenuSubscription = answersMenuObservable.subscribe(this.onPushWritingAnswers.bind(this));
        this.subscriptions.push(answersMenuSubscription);

        const loadMoreAnswersObservable = this.answersMaxId$.distinctUntilChanged().switchMap(this.updateAnswersFilter.bind(this));
        const loadMoreAnswersSubscription = answersMenuObservable.subscribe(this.onPushWritingAnswers.bind(this));
        this.subscriptions.push(loadMoreAnswersSubscription);

        this.videoSearchParams.set('cued_only', true.toString());

        // todo: get current language dynamically
        this.videoSearchParams.set('lang', 'en');
        // todo: redundant. make something like a 'trigger request' function or something..
        this.lang$.next('en');

        this.answerSearchParams.set('since', this.dateService.getDaysAgoFromDate(30).toString());
        this.answerSearchParams.set('time_zone_offset', new Date().getTimezoneOffset().toString());
        this.answersMenu$.next(30);
    }

    onClickLoadMoreAnswers(): void {
        const maxId = this.answers.records[this.answers.count - 1].id.toString();
        this.answerSearchParams.set('max_id', maxId);
        this.answersMaxId$.next(maxId);
    }

    setActiveAnswerMenuItem(answer: any): void {
        this.activeAnswerMenuItem = answer;
        this.answerSearchParams.set('since', this.dateService.getDaysAgoFromDate(answer.value).toString());
        this.answerSearchParams.delete('max_id');
        this.answersMenu$.next(answer.value);
    }

    private onPushStudyStats(stats: any): void {
        this.stats = stats;
    }

    private onPushWritingAnswers(answers: WritingAnswers): void {
        this.answers = answers;
    }

    private updateAnswersFilter(): Observable<WritingAnswers> {
        // set the new key, value HERE instead of first setting it above then calling 'next'
        return this.http.request(APIHandle.WRITING_ANSWERS, {search: this.answerSearchParams});
    }
}
