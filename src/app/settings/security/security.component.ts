/**
 * security.component
 * getnativelearning.com
 *
 * Created by henryehly on 2016/12/09.
 */

import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';

import { APIError, APIErrors } from '../../core/http/api-error';
import { HttpService } from '../../core/http/http.service';
import { UserService } from '../../core/user/user.service';
import { Entities } from '../../core/entities/entities';
import { DOMService } from '../../core/dom/dom.service';
import { APIHandle } from '../../core/http/api-handle';
import { Entity } from '../../core/entities/entity';
import { Logger } from '../../core/logger/logger';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import * as _ from 'lodash';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal/bs-modal.service';

@Component({
    selector: 'gn-security',
    templateUrl: 'security.component.html',
    styleUrls: ['security.component.scss']
})
export class SecurityComponent implements OnInit, OnDestroy {

    bsModalRef: BsModalRef;
    reason = '';
    processing = false;
    deleteUserError: APIError;
    OnDestroy$ = new Subject<void>();
    isModalVisibleEmitted$: Observable<boolean>;
    private isModalVisibleSource: BehaviorSubject<boolean>;

    constructor(private logger: Logger, private http: HttpService, private user: UserService, private dom: DOMService,
                private modalService: BsModalService) {
        this.isModalVisibleSource = new BehaviorSubject<boolean>(false);
        this.isModalVisibleEmitted$ = this.isModalVisibleSource.asObservable();
    }

    ngOnInit(): void {
        this.logger.debug(this, 'OnInit');
    }

    ngOnDestroy(): void {
        this.logger.debug(this, 'OnDestroy');
        this.OnDestroy$.next();
    }

    onClickDelete(): void {
        this.logger.debug(this, 'onClickDelete');

        let request: Observable<Entities<Entity> | Entity>;
        if (this.reason.length) {
            // todo: handling of empty reason text should be done server-side
            request = this.http.request(APIHandle.DELETE_USER, {body: {reason: this.reason}});
        } else {
            request = this.http.request(APIHandle.DELETE_USER);
        }

        this.processing = true;
        request.takeUntil(this.OnDestroy$).subscribe(this.onDeleteUserNext.bind(this), this.onDeleteUserError.bind(this));
    }

    onClickShowModal(modal: TemplateRef<any>): void {
        this.bsModalRef = this.modalService.show(modal);
    }

    onClickCloseModal(): void {
        this.bsModalRef.hide();
    }

    private onDeleteUserNext(): void {
        this.processing = false;
        this.user.logout();
        this.dom.alert('Your account has been deleted from our system.'); // todo: i18n
    }

    private onDeleteUserError(errors: APIErrors): void {
        this.processing = false;
        this.deleteUserError = _.first(errors);
    }
}
