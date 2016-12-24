/**
 * speaking.component
 * get-native.com
 *
 * Created by henryehly on 2016/12/11.
 */

import { Component, OnInit } from '@angular/core';

import { Logger } from 'angular2-logger/core';

@Component({
    moduleId: module.id,
    templateUrl: 'speaking.component.html',
    styleUrls: ['speaking.component.css']
})
export class SpeakingComponent implements OnInit {
    constructor(private logger: Logger) {
    }

    ngOnInit() {
        this.logger.info('[SpeakingComponent] ngOnInit()');
    }
}
