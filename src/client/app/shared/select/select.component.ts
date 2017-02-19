/**
 * select.component
 * get-native.com
 *
 * Created by henryehly on 2017/02/04.
 */

import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'gn-select',
    templateUrl: 'select.component.html',
    styleUrls: ['select.component.css']
})
export class SelectComponent {
    @Input() options: {value: string, title: string}[];
    @Input() selected: string;
    @Output() select: EventEmitter<string> = new EventEmitter<string>();

    selectModel: any;

    onSelect(option: string) {
        if (option.length) {
            this.select.emit(option);
        }
    }
}
