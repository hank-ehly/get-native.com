/**
 * select.component
 * get-native.com
 *
 * Created by henryehly on 2017/02/04.
 */

import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'gn-select',
    templateUrl: 'select.component.html',
    styleUrls: ['select.component.css']
})
export class SelectComponent implements OnInit {
    constructor() {
    }

    ngOnInit() {
    }

    // event on change that passes new value

    // takes key-value list as input
    // ex. {'ja': 'Japanese'} would create <option value='ja'>Japanese</option>
}
