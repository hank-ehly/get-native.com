/**
 * study.component
 * getnative.org
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
import { Subject } from 'rxjs/Subject';

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
    private OnDestroy$ = new Subject<void>();

    get isTransition(): boolean {
        this.logger.debug(this, 'isTransition');
        return /^\/study[^\/]*$/.test(this.router.url);
    }

    constructor(private logger: Logger, private navbar: NavbarService, private session: StudySessionService, private router: Router,
                private modalService: BsModalService) {
    }

    ngOnInit(): void {
        this.logger.debug(this, 'OnInit');
        this.navbar.showProgressBar();

        this.modalService.onShow.takeUntil(this.OnDestroy$).subscribe(this.onModalShow.bind(this));
        this.modalService.onHidden.takeUntil(this.OnDestroy$).subscribe(this.onModalHidden.bind(this));
        this.modalService.onHide.takeUntil(this.OnDestroy$).subscribe(this.onModalHide.bind(this));
    }

    ngOnDestroy(): void {
        this.logger.debug(this, 'OnDestroy');
        this.OnDestroy$.next();
        this.navbar.hideProgressBar();
    }

    onClickSkip(): void {
        this.logger.debug(this, 'onClickSkip');
        this.session.forceSectionEnd();
    }

    displayConfirmationModal(): void {
        this.logger.debug(this, 'displayConfirmationModal');
        this.bsModalRef = this.modalService.show(this.modalTemplateRef);
    }

    onClickCloseModal(): void {
        this.logger.debug(this, 'onClickCloseModal');
        this.bsModalRef.hide();
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
    }

    private onModalShow(): void {
        this.logger.debug(this, 'onModalShown');
        this.flags.isModalVisible = true;
        this.session.pauseSectionTimer();
    }

    private onModalHidden(): void {
        this.logger.debug(this, 'onModalHidden');

        if (!this.isTransition) {
            this.session.resumeSectionTimer();
        }
    }

    private onModalHide(): void {
        this.logger.debug(this, 'onModalHide');
        this.flags.isModalVisible = false;
    }

}
