/**
 * dashboard.component
 * get-native.com
 *
 * Created by henryehly on 2016/11/28.
 */

import { Component, OnInit, trigger, transition, style, animate } from '@angular/core';
import { Router } from '@angular/router';
import { URLSearchParams } from '@angular/http';

import { Logger, APIHandle, HttpService, CategoryListService, ToolbarService, NavbarService, WritingSessions,
    UTCDateService } from '../core/index';
import { VideoSearchComponent } from '../shared/index';

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
    studyWritingHistorySearch: URLSearchParams = new URLSearchParams();

    constructor(protected logger: Logger, protected http: HttpService, protected navbar: NavbarService, protected toolbar: ToolbarService,
                protected categoryList: CategoryListService, private router: Router, private dateService: UTCDateService) {
        super(logger, http, navbar, toolbar, categoryList);
        this.apiHandle = APIHandle.CUED_VIDEOS;
    }

    ngOnInit() {
        super.ngOnInit();

        this.logger.debug(this, 'ngOnInit()');

        this.http.request(APIHandle.STUDY_STATS).subscribe((stats: any) => this.stats = stats);

        this.studyWritingHistorySearch.set('since', this.dateService.getDaysAgoFromDate(30).toString());

        this.http.request(APIHandle.STUDY_WRITING_HISTORY, {search: this.studyWritingHistorySearch})
            .subscribe((answers: WritingSessions) => this.answers = answers);

        this.search.set('count', '9');
        this.search.set('lang', 'en');
        this.lang$.next('en');
    }

    onBegin(): void {
        this.router.navigate(['study']);
    }
}
