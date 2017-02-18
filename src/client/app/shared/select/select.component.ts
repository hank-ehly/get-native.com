/**
 * select.component
 * get-native.com
 *
 * Created by henryehly on 2017/02/04.
 */

import { Component, Input, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';

import { Logger } from '../../core/logger/logger';

@Component({
    moduleId: module.id,
    selector: 'gn-select',
    templateUrl: 'select.component.html',
    styleUrls: ['select.component.css']
})
export class SelectComponent implements OnChanges {
    @Input() options: {value: string, title: string}[];
    @Input() selected: string;
    @Output() select: EventEmitter<string> = new EventEmitter<string>();

    selectModel: any;

    constructor(private logger: Logger) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.logger.debug(this, 'ngOnChanges', changes);
    }

    onSelect(option: string) {
        if (option.length) {
            this.select.emit(option);
        }
    }
}
