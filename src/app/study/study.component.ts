/**
 * study.component
 * getnativelearning.com
 *
 * Created by henryehly on 2016/12/11.
 */

import { Component, OnDestroy, OnInit } from '@angular/core';

import { StudySessionService } from '../core/study-session/study-session.service';
import { NavbarService } from '../core/navbar/navbar.service';
import { environment } from '../../environments/environment';
import { Logger } from '../core/logger/logger';

@Component({
    templateUrl: 'study.component.html',
    styleUrls: ['study.component.scss']
})
export class StudyComponent implements OnInit, OnDestroy {
    debug: boolean = !environment.production;

    constructor(private logger: Logger, private navbar: NavbarService, private session: StudySessionService) {
    }

    ngOnInit(): void {
        this.logger.debug(this, 'OnInit');
        this.navbar.showProgressBar();
    }

    ngOnDestroy(): void {
        this.logger.debug(this, 'OnDestroy');
        this.navbar.hideProgressBar();
    }

    onClickSkip(): void {
        this.session.transition(this.session.nextSection);
    }
}
