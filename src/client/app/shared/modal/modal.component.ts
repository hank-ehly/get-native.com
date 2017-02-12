/**
 * modal.component
 * get-native.com
 *
 * Created by henryehly on 2016/12/11.
 */

import { Component, trigger, transition, animate, keyframes, style, Input, EventEmitter, Output } from '@angular/core';

import { Logger } from '../../core/index';

@Component({
    moduleId: module.id,
    selector: 'gn-modal',
    templateUrl: 'modal.component.html',
    styleUrls: ['modal.component.css'],
    animations: [
        trigger('darken', [
            transition(':enter', [
                animate(200, keyframes([
                    style({opacity: 0, offset: 0}),
                    style({opacity: 1, offset: 0.7}),
                    style({opacity: 1, offset: 1.0})
                ]))
            ]),
            transition(':leave', [
                animate(200, keyframes([
                    style({opacity: 1, offset: 0}),
                    style({opacity: 1, offset: 0.7}),
                    style({opacity: 0, offset: 1.0})
                ]))
            ])
        ]),
        trigger('fadeInOut', [
            transition(':enter', [
                animate(200, keyframes([
                    style({transform: 'scale(0.9) translate(-55%, -55%)', offset: 0}),
                    style({transform: 'scale(1.025) translate(-48.75%, -48.75%)', offset: 0.7}),
                    style({transform: 'scale(1) translate(-50%, -50%)', offset: 1.0})
                ]))
            ]),
            transition(':leave', [
                animate(200, keyframes([
                    style({transform: 'scale(1) translate(-50%, -50%)', offset: 0}),
                    style({transform: 'scale(1.025) translate(-48.75%, -48.75%)', offset: 0.7}),
                    style({transform: 'scale(0.9) translate(-55%, -55%)', offset: 1.0})
                ]))
            ])
        ])
    ]
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
