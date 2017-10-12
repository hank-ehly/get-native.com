import { Component, OnDestroy, OnInit } from '@angular/core';

import { DOMService } from '../../core/dom/dom.service';
import { Logger } from '../../core/logger/logger';

@Component({
    selector: 'gn-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {

    constructor(private logger: Logger, private dom: DOMService) {
    }

    ngOnInit() {
        this.logger.debug(this, 'OnInit');
    }

    ngOnDestroy(): void {
        this.logger.debug(this, 'OnDestroy');
    }

    onClickClose(): void {
        this.logger.debug(this, 'onClickClose');
        this.dom.alertMessage$.next(null);
    }

}
