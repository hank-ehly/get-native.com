/**
 * cookie-compliance.component
 * get-native.com
 *
 * Created by henryehly on 2016/11/11.
 */

import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'gn-cookie-compliance',
    templateUrl: 'cookie-compliance.component.html',
    styleUrls: ['cookie-compliance.component.css']
})

export class CookieComplianceComponent {
    @Output() comply = new EventEmitter();

    close() {
        this.comply.emit();
    }
}
