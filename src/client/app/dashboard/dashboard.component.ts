/**
 * dashboard.component
 * get-native.com
 *
 * Created by henryehly on 2016/11/28.
 */

import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { URLSearchParams } from '@angular/http';

import {
    Logger, APIHandle, HttpService, CategoryListService, ToolbarService, NavbarService, WritingSessions,
    UTCDateService
} from '../core/index';
import { VideoSearchComponent } from '../shared/index';

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
    answers: WritingSessions;
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
                protected categoryList: CategoryListService, private router: Router, private dateService: UTCDateService) {
        super(logger, http, navbar, toolbar, categoryList);
        this.apiHandle = APIHandle.CUED_VIDEOS;
    }

    ngOnInit() {
        super.ngOnInit();

        this.logger.debug(this, 'ngOnInit()');

        this.subscriptions.push(
            this.http.request(APIHandle.STUDY_STATS)
                .subscribe((stats: any) => this.stats = stats),

            this.answersMenu$.distinctUntilChanged().switchMap(this.updateAnswersFilter.bind(this))
                .subscribe((a: WritingSessions) => this.answers = a),

            this.answersMaxId$.distinctUntilChanged().switchMap(this.updateAnswersFilter.bind(this))
                .subscribe((a: WritingSessions) => this.answers = a)
        );

        this.videoSearchParams.set('count', '9');
        this.videoSearchParams.set('lang', 'en');
        this.lang$.next('en');

        this.answerSearchParams.set('since', this.dateService.getDaysAgoFromDate(30).toString());
        this.answersMenu$.next(30);
    }

    onBegin(): void {
        this.router.navigate(['study']).then();
    }

    onClickLoadMoreAnswers(): void {
        let maxId = this.answers.records[this.answers.count - 1].id.toString();
        this.answerSearchParams.set('max_id', maxId);
        this.answersMaxId$.next(maxId);
    }

    setActiveAnswerMenuItem(answer: any): void {
        this.activeAnswerMenuItem = answer;
        this.answerSearchParams.set('since', this.dateService.getDaysAgoFromDate(answer.value).toString());
        this.answerSearchParams.delete('max_id');
        this.answersMenu$.next(answer.value);
    }

    private updateAnswersFilter(): Observable<WritingSessions> {
        return this.http.request(APIHandle.WRITING_ANSWERS, {search: this.answerSearchParams});
    }
}
