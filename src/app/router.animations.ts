/**
 * router.animations
 * getnative.org
 *
 * Created by henryehly on 2017/12/23.
 */

import { animate, animateChild, group, query, sequence, style, transition, trigger } from '@angular/animations';

const SCROLL_RIGHT = [
    query(':enter, :leave', style({width: '100%', position: 'absolute'})),
    query(':enter', style({transform: 'translateX(100%)'})),
    sequence([
        query(':leave', animateChild()),
        group([
            query(':leave', [
                style({transform: 'translateX(0%)'}),
                animate('650ms cubic-bezier(1, -0.3, 0.26, 1.15)', style({transform: 'translateX(-100%)'}))
            ]),
            query(':enter', [
                style({transform: 'translateX(100%)'}),
                animate('650ms cubic-bezier(1, -0.3, 0.26, 1.15)', style({transform: 'translateX(0%)'})),
            ]),
        ]),
        query(':enter', animateChild()),
    ])
];

const SCROLL_LEFT = [
    query(':enter, :leave', style({width: '100%', position: 'absolute'})),
    query(':enter', style({transform: 'translateX(100%)'})),
    sequence([
        query(':leave', animateChild()),
        group([
            query(':leave', [
                style({transform: 'translateX(0%)'}),
                animate('650ms cubic-bezier(1, -0.3, 0.26, 1.15)', style({transform: 'translateX(100%)'}))
            ]),
            query(':enter', [
                style({transform: 'translateX(-100%)'}),
                animate('650ms cubic-bezier(1, -0.3, 0.26, 1.15)', style({transform: 'translateX(0%)'})),
            ]),
        ]),
        query(':enter', animateChild()),
    ])
];

export const routerTransition = trigger('routerTransition', [
    transition('library => library-detail', SCROLL_RIGHT),
    transition('library-detail => library', SCROLL_LEFT)
]);
