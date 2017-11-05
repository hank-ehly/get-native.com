/**
 * dashboard.component
 * getnativelearning.com
 *
 * Created by henryehly on 2016/11/28.
 */

import { trigger, style, transition, animate } from '@angular/animations';
import { Component, Inject, LOCALE_ID, OnDestroy, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import { VideoSearchComponent } from '../shared/video-search/video-search.component';
import { CategoryListService } from '../core/category-list/category-list.service';
import { StudySessionService } from '../core/study-session/study-session.service';
import { StudySessionSection } from '../core/typings/study-session-section';
import { LoadingState } from '../shared/video-search/loading-state.enum';
import { UTCDateService } from '../core/utc-date/utc-date.service';
import { WritingAnswer } from '../core/entities/writing-answer';
import { NavbarService } from '../core/navbar/navbar.service';
import { StudySession } from '../core/entities/study-session';
import { LanguageCode } from '../core/typings/language-code';
import { HttpService } from '../core/http/http.service';
import { LangService } from '../core/lang/lang.service';
import { UserService } from '../core/user/user.service';
import { DOMService } from '../core/dom/dom.service';
import { Entities } from '../core/entities/entities';
import { APIHandle } from '../core/http/api-handle';
import { APIErrors } from '../core/http/api-error';
import { Logger } from '../core/logger/logger';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/do';
import * as _ from 'lodash';

@Component({
    selector: 'gn-dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.scss'],
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

    OnDestroy$ = new Subject<void>();
    maxAnswerId: number = null;

    filterAnswers = new Subject<number>();
    answerFilterStream$ = this.filterAnswers.startWith(30).distinctUntilChanged();
    flags: any;
    answersLoadingState: LoadingState;
    errors = {
        createStudySession: null
    };

    private loadMoreAnswers = new Subject<number>();

    answers$ = this.studyLanguageCode$.combineLatest(this.answerFilterStream$).switchMap(([lang, since]: [LanguageCode, number]) => {
        return this.loadMoreAnswers.startWith(null).distinctUntilChanged().concatMap((maxId?: number) => {
            const search = new HttpParams();

            if (since) {
                search.set('since', this.dateService.getDaysAgoFromDate(since).toString());
            }

            if (maxId) {
                search.set('max_id', maxId.toString());
            }

            const options = {
                params: search,
                replace: {
                    lang: lang
                }
            };

            this.answersLoadingState = LoadingState.Loading;
            return this.http.request(APIHandle.WRITING_ANSWERS, options);
        }, (unused: any, answers: Entities<WritingAnswer>) => answers.records)
            .do(this.updateMaxAnswerId.bind(this))
            .do(() => {
                if (this.answersLoadingState !== LoadingState.ReachedLastResult) {
                    this.answersLoadingState = LoadingState.CanLoadMore;
                }
            })
            .scan(this.concatWritingAnswers.bind(this), []);
    }).share();

    stats$ = this.studyLanguageCode$.concatMap((lang: LanguageCode) => {
        return this.http.request(APIHandle.STUDY_STATS, {
            replace: {
                lang: lang
            }
        });
    });

    constructor(protected logger: Logger, protected http: HttpService, protected navbar: NavbarService, protected user: UserService,
                private dateService: UTCDateService, private session: StudySessionService, protected categoryList: CategoryListService,
                protected dom: DOMService, protected lang: LangService, @Inject(LOCALE_ID) protected localeId: string) {
        super(logger, http, navbar, user, categoryList, dom, lang, localeId);
        this.flags.cuedOnly = true;
        this.flags.processing.beginStudySession = false;
    }

    ngOnInit(): void {
        this.logger.debug(this, 'OnInit');
    }

    ngOnDestroy(): void {
        this.logger.debug(this, 'OnDestroy');
        this.OnDestroy$.next();
    }

    onBegin(studySession: StudySession): void {
        this.flags.processing.beginStudySession = true;
        this.session.create(studySession)
            .takeUntil(this.OnDestroy$)
            .subscribe(this.onCreateStudySessionNext.bind(this), this.onCreateStudySessionError.bind(this));
    }

    onLoadMoreAnswers(maxId: number): void {
        this.loadMoreAnswers.next(maxId);
    }

    private onCreateStudySessionNext(): void {
        this.flags.processing.beginStudySession = false;
        this.session.transition(StudySessionSection.Listening);
    }

    private onCreateStudySessionError(errors: APIErrors): void {
        this.flags.processing.beginStudySession = false;
        if (errors && errors.length) {
            this.errors.createStudySession = _.first(errors);
        } else {
            this.errors.createStudySession = {code: 'Unknown', message: 'An unknown error occurred'};
        }
    }

    private updateMaxAnswerId(records?: WritingAnswer[]): void {
        if (!_.isEmpty(records)) {
            this.maxAnswerId = _.last(records).id;
        }
    }

    private concatWritingAnswers(acc: WritingAnswer[], records: WritingAnswer[]) {
        if (!records) {
            return [];
        }

        if (acc.length && !records.length) {
            this.answersLoadingState = LoadingState.ReachedLastResult;
        } else if (!acc.length && !records.length) {
            this.answersLoadingState = LoadingState.NoResults;
        }

        return _.unionWith(acc, records, _.isEqual);
    }

}
