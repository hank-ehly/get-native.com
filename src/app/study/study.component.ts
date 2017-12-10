/**
 * study.component
 * getnativelearning.com
 *
 * Created by henryehly on 2016/12/11.
 */

import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { StudySessionService } from '../core/study-session/study-session.service';
import { NavbarService } from '../core/navbar/navbar.service';
import { environment } from '../../environments/environment';
import { Logger } from '../core/logger/logger';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
    templateUrl: 'study.component.html',
    styleUrls: ['study.component.scss']
})
export class StudyComponent implements OnInit, OnDestroy {

    flags = {
        isProd: environment.production,
        isModalVisible: false
    };

    bsModalRef: BsModalRef;
    @ViewChild('modal') modalTemplateRef: TemplateRef<any>;
    quitURL: string;

    constructor(private logger: Logger, private navbar: NavbarService, private session: StudySessionService, private router: Router,
                private modalService: BsModalService) {
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
        this.logger.debug(this, 'skipping to next section');
        this.session.forceSectionEnd();
    }

    displayConfirmationModal(): void {
        this.bsModalRef = this.modalService.show(this.modalTemplateRef);
        this.flags.isModalVisible = true;
    }

    onClickCloseModal(): void {
        this.bsModalRef.hide();
        this.flags.isModalVisible = false;
    }

    onClickQuit(): void {
        this.logger.debug(this, 'onClickQuit');

        if (!this.quitURL) {
            this.logger.debug(this, 'Tried to navigate without setting quitURL');
            return;
        }

        this.bsModalRef.hide();
        this.router.navigateByUrl(this.quitURL);
    }

    onClickCancel(): void {
        this.logger.debug(this, 'onClickCancel');
        this.bsModalRef.hide();
        this.flags.isModalVisible = false;
    }

}
