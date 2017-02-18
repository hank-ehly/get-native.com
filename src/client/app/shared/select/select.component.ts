/**
 * select.component
 * get-native.com
 *
 * Created by henryehly on 2017/02/04.
 */

import { Component, OnInit, Input } from '@angular/core';

import { Logger } from '../../core/logger/logger';

@Component({
    moduleId: module.id,
    selector: 'gn-select',
    templateUrl: 'select.component.html',
    styleUrls: ['select.component.css']
})
export class SelectComponent implements OnInit {
    @Input() options: {value: string, name: string}[] = [{value: 'foo', name: 'bar'}];
    select: any;

    constructor(private logger: Logger) {
    }

    ngOnInit() {
    }

    onSelect(option: string) {
        this.logger.debug(this, `Selected ${option}`);
    }
}
