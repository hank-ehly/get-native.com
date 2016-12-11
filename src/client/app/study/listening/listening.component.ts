/**
 * listening.component
 * get-native.com
 *
 * Created by henryehly on 2016/12/11.
 */

import { Component, OnInit } from '@angular/core';

import { NavbarService } from '../../core/navbar/navbar.service';

import { Logger } from 'angular2-logger/core';

@Component({
    moduleId: module.id,
    selector: 'gn-listening',
    templateUrl: 'listening.component.html',
    styleUrls: ['listening.component.css']
})
export class ListeningComponent implements OnInit {
    constructor(private logger: Logger, private navbar: NavbarService) {
    }

    ngOnInit() {
        this.logger.info('[ListeningComponent] ngOnInit()');
        this.navbar.setTitle('LISTENING');
    }
}
