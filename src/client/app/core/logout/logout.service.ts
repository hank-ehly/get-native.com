/**
 * logout.service
 * get-native.com
 *
 * Created by henryehly on 2016/12/04.
 */

import { AuthService } from '../auth/auth.service';
import { Injectable } from '@angular/core';

@Injectable()

export class LogoutService {
    constructor(private authService: AuthService) {
    }

    /* TODO: Implement */
    logout(): void {
        this.authService.authenticate(false);
    }
}
