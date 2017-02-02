/**
 * general.component
 * get-native.com
 *
 * Created by henryehly on 2016/12/09.
 */

import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'gn-general',
    templateUrl: 'general.component.html',
    styleUrls: ['general.component.css']
})
export class GeneralComponent {
    isEditing: boolean = false;
    password: string = '';

    onToggleEditing(): void {
        this.isEditing = !this.isEditing;
    }
}
