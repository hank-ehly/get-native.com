import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { UserService } from '../user/user.service';
import { HttpService } from '../http/http.service';
import { DOMService } from '../dom/dom.service';
import { APIHandle } from '../http/api-handle';
import { APIErrors } from '../http/api-error';
import { User } from '../entities/user';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import * as _ from 'lodash';

@Injectable()
export class ConfirmEmailUpdateResolver implements Resolve<any> {
    constructor(private http: HttpService, private router: Router, private user: UserService, private dom: DOMService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
        return this.http.request(APIHandle.CONFIRM_EMAIL_UPDATE, {body: {token: route.queryParams['token']}})
            .map(this.onConfirmEmailUpdateNext.bind(this))
            .toPromise()
            .catch(this.onConfirmEmailUpdateError.bind(this));
    }

    private onConfirmEmailUpdateNext(user: User) {
        this.user.update(user);
        this.router.navigate(['/settings']).then(() => {
            this.dom.alert('Your email address has been successfully updated.');
        });
    }

    private onConfirmEmailUpdateError(errors: APIErrors) {
        this.router.navigate(['']).then(() => {
            this.dom.alert(_.first(errors).message);
        });
    }
}
