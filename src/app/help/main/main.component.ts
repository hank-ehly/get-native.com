import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

import { Logger } from '../../core/logger/logger';

import * as _ from 'lodash';

@Component({
    selector: 'gn-help-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
    animations: [
        trigger('visible', [
            transition(':enter', [
                style({opacity: 0}),
                animate(300, style({opacity: 1}))
            ]),
            transition(':leave', [
                animate(200, style({opacity: 0}))
            ])
        ]),
        trigger('rotation', [
            state('collapsed', style({transform: 'rotate(0)'})),
            state('expanded', style({transform: 'rotate(90deg)'})),
            transition('collapsed => expanded', animate(50)),
            transition('expanded => collapsed', animate(50))
        ])
    ]
})
export class HelpMainComponent implements OnInit {

    expandedFaqIndices: number[] = [];

    constructor(private logger: Logger) {
    }

    ngOnInit(): void {
        this.logger.debug(this, 'OnInit');
    }

    toggleFaqAtIndex(i: number): void {
        if (this.isFaqExpandedAtIndex(i)) {
            this.expandedFaqIndices.splice(this.expandedFaqIndices.indexOf(i), 1);
        } else {
            this.expandedFaqIndices.push(i);
        }
    }

    chevronRotationForFaqAtIndex(i: number): string {
        return this.isFaqExpandedAtIndex(i) ? 'expanded' : 'collapsed';
    }

    isFaqExpandedAtIndex(i: number): boolean {
        return _.includes(this.expandedFaqIndices, i);
    }

}
