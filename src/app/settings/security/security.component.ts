/**
 * security.component
 * getnativelearning.com
 *
 * Created by henryehly on 2016/12/09.
 */

import { Component, OnDestroy, OnInit } from '@angular/core';

import { HttpService } from '../../core/http/http.service';
import { UserService } from '../../core/user/user.service';
import { APIHandle } from '../../core/http/api-handle';
import { Logger } from '../../core/logger/logger';

import { Entities } from '../../core/entities/entities';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Entity } from '../../core/entities/entity';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

@Component({
    selector: 'gn-security',
    templateUrl: 'security.component.html',
    styleUrls: ['security.component.scss']
})
export class SecurityComponent implements OnInit, OnDestroy {
    modalVisibility$ = new BehaviorSubject<boolean>(false);
    reason = '';
    private subscriptions: Subscription[] = [];

    constructor(private logger: Logger, private http: HttpService, private user: UserService) {
    }

    ngOnInit(): void {
        this.logger.debug(this, 'OnInit');
    }

    ngOnDestroy(): void {
        this.logger.debug(this, 'OnDestroy');
        _.invokeMap(this.subscriptions, 'unsubscribe');
    }

    onClickDelete(): void {
        this.logger.debug(this, 'onClickDelete');

        let request: Observable<Entities<Entity> | Entity>;
        if (this.reason.length) {
            request = this.http.request(APIHandle.DELETE_USER, {body: {reason: this.reason}});
        } else {
            request = this.http.request(APIHandle.DELETE_USER);
        }

        this.subscriptions.push(
            request.subscribe(() => {
                    this.logger.debug(this, 'DELETE_USER successful');
                    this.user.logout();
                }, (e: any) => {
                    this.logger.debug(this, 'DELETE_USER error', e);
                }
            )
        );
    }
}
