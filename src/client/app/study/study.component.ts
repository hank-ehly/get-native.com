/**
 * study.component
 * get-native.com
 *
 * Created by henryehly on 2016/12/11.
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Logger } from 'angular2-logger/core';

@Component({
    moduleId: module.id,
    templateUrl: 'study.component.html',
    styleUrls: ['study.component.css']
})
export class StudyComponent implements OnInit {
    activePage: string;

    constructor(private logger: Logger, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.logger.info('[StudyComponent] ngOnInit()');
        this.route.params.subscribe(this.paramsChanged.bind(this));
    }

    paramsChanged(params: Params): void {
        this.logger.info('[StudyComponent] paramsChanged: ', params);
        if (params['page']) {
            this.activePage = params['page'];
        }
    }
}
