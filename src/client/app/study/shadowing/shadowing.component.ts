/**
 * shadowing.component
 * get-native.com
 *
 * Created by henryehly on 2016/12/11.
 */

import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'gn-shadowing',
    templateUrl: 'shadowing.component.html',
    styleUrls: ['shadowing.component.css']
})
export class ShadowingComponent implements OnInit {
    isModalVisible: boolean;

    constructor() {
    }

    ngOnInit() {
    }

    showModal(): void {
        this.isModalVisible = true;
    }

    onClose(): void {
        this.isModalVisible = false;
    }
}
