/**
 * login.service
 * get-native.com
 *
 * Created by henryehly on 2016/11/15.
 */

import { Injectable } from '@angular/core';

import { AuthService } from '../auth/auth.service';

import { Subject } from 'rxjs/Subject';

@Injectable()

/* TODO: Separate login service from login modal service. One is for UI -- the other is for business logic */
export class LoginService {
    showModalSource = new Subject();
    showModal$ = this.showModalSource.asObservable();

    hideModalSource = new Subject();
    hideModal$ = this.hideModalSource.asObservable();

    setActiveViewSource = new Subject<string>();
    setActiveView$ = this.setActiveViewSource.asObservable();

    constructor(private authService: AuthService) {
    }

    showModal(): void {
        this.showModalSource.next();
    }

    hideModal(): void {
        this.hideModalSource.next();
    }

    setActiveView(view: string): void {
        this.setActiveViewSource.next(view);
    }

    /* TODO: Implement */
    login(): void {
        this.authService.authenticate(true);
    }
}
