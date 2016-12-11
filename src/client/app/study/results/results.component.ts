/**
 * results.component
 * get-native.com
 *
 * Created by henryehly on 2016/12/12.
 */

import { Component, OnInit } from '@angular/core';

import { NavbarService } from '../../core/navbar/navbar.service';

import { Logger } from 'angular2-logger/core';

@Component({
    moduleId: module.id,
    selector: 'gn-results',
    templateUrl: 'results.component.html',
    styleUrls: ['results.component.css']
})
export class ResultsComponent implements OnInit {
    constructor(private logger: Logger, private navbar: NavbarService) {
    }

    ngOnInit() {
        this.logger.info('[ResultsComponent] ngOnInit()');
        this.navbar.setTitle('Results');
    }
}
