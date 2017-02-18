/**
 * select.component
 * get-native.com
 *
 * Created by henryehly on 2017/02/04.
 */

import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

import { Logger } from '../../core/logger/logger';

@Component({
    moduleId: module.id,
    selector: 'gn-select',
    templateUrl: 'select.component.html',
    styleUrls: ['select.component.css']
})
export class SelectComponent implements OnInit, OnChanges {
    @Input() options: {value: string, title: string}[];
    @Input() selected: string;

    select: any;

    constructor(private logger: Logger) {
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.logger.debug(this, 'ngOnChanges', changes);
    }

    onSelect(option: string) {
        this.logger.debug(this, `Selected '${option}'`);
    }
}
