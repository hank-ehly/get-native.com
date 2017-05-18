/**
 * results.component
 * get-native.com
 *
 * Created by henryehly on 2016/12/12.
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { StudySessionService } from '../../core/study-session/study-session.service';
import { LangService } from '../../core/lang/lang.service';
import { Logger } from '../../core/logger/logger';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/share';
import * as _ from 'lodash';

@Component({
    moduleId: module.id,
    templateUrl: 'results.component.html',
    styleUrls: ['results.component.css']
})
export class ResultsComponent implements OnInit, OnDestroy {
    stats$         = this.route.data.pluck('stats');

    currentSession = this.session.current;
    timeStudied    = _.round(this.currentSession.session.study_time / 60, 1);
    language       = this.lang.codeToName(this.currentSession.video.language.code);

    totalTimeStudied$: Observable<number> = this.stats$
        .pluck('total_time_studied')
        .map((seconds: number) => seconds / 60)
        .map(_.round);

    constructor(private logger: Logger, private route: ActivatedRoute, private session: StudySessionService, private lang: LangService) {
    }

    ngOnInit(): void {
        this.logger.debug(this, 'OnInit');
    }

    ngOnDestroy(): void {
        this.logger.debug(this, 'OnDestroy');
    }

}
