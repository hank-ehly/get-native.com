/**
 * help.component
 * get-native.com
 *
 * Created by henryehly on 2016/11/08.
 */

import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { environment } from '../../../environments/environment';

import * as _ from 'lodash';
import { NavbarService } from '../../core/navbar/navbar.service';
import { Logger } from '../../core/logger/logger';

interface Faq {
    title: string;
    body: string;
}

@Component({
    selector: 'gn-help',
    templateUrl: 'help.component.html',
    styleUrls: ['help.component.scss'],
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
export class HelpComponent implements OnInit {
    moderator: string = environment.moderator;
    expandedFaqIndices: number[] = [];

    faqs: Faq[] = [
        {
            title: 'First FAQ',
            body: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, alias consequatur cupiditate,
                dolores eos esse ex in inventore ipsam laudantium odio odit possimus provident quod tenetur voluptates
                voluptatibus? Cupiditate, est? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, alias
                consequatur cupiditate, dolores eos esse ex in inventore ipsam laudantium odio odit possimus provident
                quod tenetur voluptates voluptatibus? Cupiditate, est?`
        },
        {
            title: 'Second FAQ',
            body: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, alias consequatur cupiditate,
                dolores eos esse ex in inventore ipsam laudantium odio odit possimus provident quod tenetur voluptates
                voluptatibus? Cupiditate, est? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, alias
                consequatur cupiditate, dolores eos esse ex in inventore ipsam laudantium odio odit possimus provident
                quod tenetur voluptates voluptatibus? Cupiditate, est?`
        },
        {
            title: 'Third FAQ',
            body: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, alias consequatur cupiditate,
                dolores eos esse ex in inventore ipsam laudantium odio odit possimus provident quod tenetur voluptates
                voluptatibus? Cupiditate, est? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, alias
                consequatur cupiditate, dolores eos esse ex in inventore ipsam laudantium odio odit possimus provident
                quod tenetur voluptates voluptatibus? Cupiditate, est?`
        }
    ];

    constructor(private logger: Logger, private navbar: NavbarService) {
    }

    ngOnInit(): void {
        this.logger.debug(this, 'OnInit');
        this.navbar.hideMagnifyingGlass();
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
