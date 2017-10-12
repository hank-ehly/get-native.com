/**
 * compliance.component
 * getnativelearning.com
 *
 * Created by henryehly on 2016/11/11.
 */

import { Component } from '@angular/core';

import { UserService } from '../../core/user/user.service';

@Component({
    selector: 'gn-compliance',
    templateUrl: 'compliance.component.html',
    styleUrls: ['compliance.component.scss']
})
export class ComplianceComponent {
    constructor(private user: UserService) {
    }

    onClickClose(): void {
        this.user.comply();
    }
}
