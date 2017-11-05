/**
 * select.component
 * getnativelearning.com
 *
 * Created by henryehly on 2017/02/04.
 */

import { Component, Input, EventEmitter, Output } from '@angular/core';

import { Subject } from 'rxjs/Subject';

@Component({
    selector: 'gn-select',
    templateUrl: 'select.component.html',
    styleUrls: ['select.component.scss']
})
export class SelectComponent {

    @Input() options: {value: string, title: string}[];
    @Input() selected: string;
    @Input() disabled: boolean;
    @Input() name: string;
    @Output() selection$ = new Subject<string>();

    onInput(e: Event): void {
        const target         = <HTMLSelectElement>e.target;
        const selectedOption = <HTMLOptionElement>target.options[target.selectedIndex];
        this.selection$.next(selectedOption.value);
    }

}
