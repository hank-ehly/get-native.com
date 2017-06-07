/**
 * modal.component
 * get-native.com
 *
 * Created by henryehly on 2016/12/11.
 */

import { Component, Input, EventEmitter, Output } from '@angular/core';

import { Logger } from '../../core/logger/logger';

@Component({

    selector: 'gn-modal',
    templateUrl: 'modal.component.html',
    styleUrls: ['modal.component.css']
})
export class ModalComponent {
    @Input() isVisible: boolean;
    @Output() close = new EventEmitter();

    constructor(private logger: Logger) {
    }

    onClickClose(e: MouseEvent): void {
        let t = <HTMLElement>e.target;
        if (['overlay', 'modal-frame__close-button'].indexOf(t.className) !== -1) {
            this.logger.debug(this, 'onClickClose()');
            this.isVisible = false;
            this.close.emit();
        }
    }
}
