/**
 * switch.component
 * getnativelearning.com
 *
 * Created by henryehly on 2016/12/11.
 */

import { Component, Input, Output } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';

@Component({
    selector: 'gn-switch',
    templateUrl: 'switch.component.html',
    styleUrls: ['switch.component.scss']
})
export class SwitchComponent {
    @Input() on = false;
    @Input() disabled = false;

    @Output() toggleEmitted$: Observable<boolean>;
    private toggle$: Subject<boolean>;

    constructor() {
        this.toggle$ = new Subject<boolean>();
        this.toggleEmitted$ = this.toggle$.asObservable().debounceTime(500).distinctUntilChanged();
    }

    toggle(): void {
        this.toggle$.next(this.on);
    }
}
