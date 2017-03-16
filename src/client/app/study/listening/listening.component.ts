/**
 * listening.component
 * get-native.com
 *
 * Created by henryehly on 2016/12/11.
 */

import { Component, OnInit } from '@angular/core';

import { Logger } from '../../core/logger/logger';

@Component({
    moduleId: module.id,
    templateUrl: 'listening.component.html',
    styleUrls: ['listening.component.css']
})
export class ListeningComponent implements OnInit {
    constructor(private logger: Logger) {
    }

    ngOnInit() {
        this.logger.info(this, 'ngOnInit()');
    }
}
