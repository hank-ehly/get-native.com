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
import { CategoryListService } from '../core/category-list/category-list.service';
import { StudySessionService } from '../core/study-session/study-session.service';
import { UTCDateService } from '../core/utc-date/utc-date.service';
import { WritingAnswer } from '../core/entities/writing-answer';
import { NavbarService } from '../core/navbar/navbar.service';
import { StudySession } from '../core/entities/study-session';
import { LanguageCode } from '../core/typings/language-code';
import { HttpService } from '../core/http/http.service';
import { UserService } from '../core/user/user.service';
import { kListening } from '../core/study-session/section-keys';
import { APIHandle } from '../core/http/api-handle';
import { Logger } from '../core/logger/logger';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/do';
import * as _ from 'lodash';
import { Entities } from '../core/entities/entities';

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
export class DashboardComponent extends VideoSearchComponent {
    maxAnswerId: number = null;

    filterAnswers       = new Subject<number>();
    loadMoreAnswers     = new Subject<number>();
    answerFilterStream$ = this.filterAnswers.startWith(30).distinctUntilChanged();

    answers$ = this.studyLanguageCode$.combineLatest(this.answerFilterStream$).switchMap(([lang, since]: [LanguageCode, number]) => {
        return this.loadMoreAnswers.startWith(null).distinctUntilChanged().concatMap((maxId?: number) => {
            const search = new URLSearchParams();

            if (since) {
                search.set('since', this.dateService.getDaysAgoFromDate(since).toString());
            }

            if (maxId) {
                search.set('max_id', maxId.toString());
            }

            const options = {
                search: search,
                params: {
                    lang: lang
                }
            };

            return this.http.request(APIHandle.WRITING_ANSWERS, options);
        }, (_, answers: Entities<WritingAnswer>) => answers.records)
            .do(this.updateMaxAnswerId.bind(this)).scan(this.concatWritingAnswers, []);
    });

    stats$ = this.studyLanguageCode$.concatMap((lang: LanguageCode) => {
        return this.http.request(APIHandle.STUDY_STATS, {
            params: {
                lang: lang
            }
        });
    });

    constructor(protected logger: Logger, protected http: HttpService, protected navbar: NavbarService, protected user: UserService,
                private dateService: UTCDateService, private session: StudySessionService, protected categoryList: CategoryListService) {
        super(logger, http, navbar, user, categoryList);
        this.cuedOnly = true;
    }

    onBegin(studySession: StudySession): void {
        this.session.create(studySession).toPromise().then(() => {
            this.session.transition(kListening);
        });
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
