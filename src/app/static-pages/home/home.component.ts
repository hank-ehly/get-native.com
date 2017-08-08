/**
 * home.component
 * getnativelearning.com
 *
 * Created by henryehly on 2016/11/06.
 */

import { Component } from '@angular/core';

import { LoginModalService } from '../../core/login-modal/login-modal.service';

@Component({
    selector: 'gn-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss']
})
export class HomeComponent {
    constructor(public loginModal: LoginModalService) {
    }
}
