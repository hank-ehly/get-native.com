/**
 * study.component
 * get-native.com
 *
 * Created by henryehly on 2016/12/11.
 */

import { Component, OnInit } from '@angular/core';

import { Logger } from 'angular2-logger/core';

@Component({
    moduleId: module.id,
    templateUrl: 'study.component.html',
    styleUrls: ['study.component.css']
})
export class StudyComponent implements OnInit {
    constructor(private logger: Logger) {
    }

    ngOnInit() {
        this.logger.info('[StudyComponent] ngOnInit()');
    }
}
