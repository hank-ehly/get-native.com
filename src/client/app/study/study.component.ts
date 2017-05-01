/**
 * study.component
 * get-native.com
 *
 * Created by henryehly on 2016/12/11.
 */

import { Component, OnDestroy, OnInit } from '@angular/core';

import { NavbarService } from '../core/navbar/navbar.service';
import { Logger } from '../core/logger/logger';

@Component({
    moduleId: module.id,
    templateUrl: 'study.component.html',
    styleUrls: ['study.component.css']
})
export class StudyComponent implements OnInit, OnDestroy {
    constructor(private logger: Logger, private navbar: NavbarService) {
    }

    ngOnInit(): void {
        this.logger.debug(this, 'OnInit');
        this.navbar.showProgressBar();
    }

    ngOnDestroy(): void {
        this.logger.debug(this, 'OnDestroy');
        this.navbar.hideProgressBar();
    }
}
