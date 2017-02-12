/**
 * results.component
 * get-native.com
 *
 * Created by henryehly on 2016/12/12.
 */

import { Component, OnInit } from '@angular/core';

import { Logger } from '../../core/index';

@Component({
    moduleId: module.id,
    templateUrl: 'results.component.html',
    styleUrls: ['results.component.css']
})
export class ResultsComponent implements OnInit {
    constructor(private logger: Logger) {
    }

    ngOnInit() {
        this.logger.info(this, 'ngOnInit()');
    }
}
