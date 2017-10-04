/**
 * confirm-email-resolver.service
 * getnativelearning.com
 *
 * Created by henryehly on 2017/04/20.
 */

import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { UserService } from '../user/user.service';
import { HttpService } from '../http/http.service';
import { DOMService } from '../dom/dom.service';
import { APIHandle } from '../http/api-handle';
import { APIErrors } from '../http/api-error';
import { Logger } from '../logger/logger';
import { User } from '../entities/user';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import * as _ from 'lodash';

@Injectable()
export class ConfirmEmailResolver implements Resolve<any> {

    constructor(private http: HttpService, private router: Router, private user: UserService, private logger: Logger,
                private dom: DOMService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
        const options = {body: {token: route.queryParams['token']}};
        return this.http.request(APIHandle.CONFIRM_EMAIL, options)
            .map(this.onConfirmEmailSuccess.bind(this))
            .toPromise()
            .catch(this.onConfirmEmailError.bind(this));
    }

    private onConfirmEmailSuccess(user: User): void {
        this.user.update(user);
        this.router.navigate(['/dashboard']).then(() => {
            this.dom.alert('Email successfully confirmed.');
        });
    }

    private onConfirmEmailError(errors: APIErrors): void {
        this.router.navigate(['']).then(() => {
            this.dom.alert(_.first(errors).message);
        });
    }

}
