/**
 * select.component
 * get-native.com
 *
 * Created by henryehly on 2017/02/04.
 */

import { Component, Input, EventEmitter, Output } from '@angular/core';

import { Subject } from 'rxjs/Subject';

@Component({
    moduleId: module.id,
    selector: 'gn-select',
    templateUrl: 'select.component.html',
    styleUrls: ['select.component.css']
})
export class SelectComponent {
    @Input() options: {value: string, title: string}[];
    @Input() selected: string;
    @Output() selection$ = new Subject<string>();

    onInput(e: Event): void {
        const target         = <HTMLSelectElement>e.target;
        const selectedOption = <HTMLOptionElement>target.options[target.selectedIndex];
        this.selection$.next(selectedOption.value);
    }
}
