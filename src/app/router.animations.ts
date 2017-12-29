/**
 * router.animations
 * getnativelearning.com
 *
 * Created by henryehly on 2017/12/23.
 */

import { animate, animateChild, AnimationMetadata, group, query, sequence, style, transition, trigger } from '@angular/animations';

export enum Direction {
    Up, Right, Down, Left
}

export function scrollAnimation(direction): AnimationMetadata | AnimationMetadata[] {
    const translation = [Direction.Up, Direction.Down].includes(direction) ? 'translateY' : 'translateX';

    return [
        query(':enter, :leave', style({width: '100%'})),
        query(':enter', style({position: 'fixed', transform: translation + '(100%)'})),
        query(':leave', style({position: 'absolute', marginBottom: '50px'})),
        sequence([
            query(':leave', animateChild()),
            group([
                query(':leave', [
                    style({transform: translation + '(0%)'}),
                    animate('650ms cubic-bezier(1, -0.3, 0.26, 1.15)', style({
                        transform: translation + '(' + ([Direction.Down, Direction.Right].includes(direction) ? '-' : '') + '100%)'
                    }))
                ]),
                query(':enter', [
                    style({
                        transform: translation + '(' + ([Direction.Up, Direction.Left].includes(direction) ? '-' : '') + '100%)'
                    }),
                    animate('650ms cubic-bezier(1, -0.3, 0.26, 1.15)', style({transform: translation + '(0%)'})),
                ]),
            ]),
            query(':enter', animateChild()),
        ])
    ];
}

const SCROLL_UP = [
    query(':enter, :leave', style({width: '100%'})),
    query(':enter', style({position: 'fixed', transform: 'translateY(100%)'})),
    query(':leave', style({position: 'absolute', marginBottom: '50px'})),
    sequence([
        query(':leave', animateChild()),
        group([
            query(':leave', [
                style({transform: 'translateY(0%)'}),
                animate('650ms cubic-bezier(1, -0.3, 0.26, 1.15)', style({transform: 'translateY(100%)'}))
            ]),
            query(':enter', [
                style({transform: 'translateY(-100%)'}),
                animate('650ms cubic-bezier(1, -0.3, 0.26, 1.15)', style({transform: 'translateY(0%)'})),
            ]),
        ]),
        query(':enter', animateChild()),
    ])
];

const SCROLL_DOWN = [
    query(':enter, :leave', style({width: '100%'})),
    query(':enter', style({position: 'fixed', transform: 'translateY(100%)'})),
    query(':leave', style({position: 'absolute', marginBottom: '50px'})),
    sequence([
        query(':leave', animateChild()),
        group([
            query(':leave', [
                style({transform: 'translateY(0%)'}),
                animate('650ms cubic-bezier(1, -0.3, 0.26, 1.15)', style({transform: 'translateY(-100%)'}))
            ]),
            query(':enter', [
                style({transform: 'translateY(100%)'}),
                animate('650ms cubic-bezier(1, -0.3, 0.26, 1.15)', style({transform: 'translateY(0%)'})),
            ]),
        ]),
        query(':enter', animateChild()),
    ])
];

const SCROLL_RIGHT = [
    query(':enter, :leave', style({width: '100%'})),
    query(':enter', style({position: 'fixed', transform: 'translateX(100%)'})),
    query(':leave', style({position: 'absolute', marginBottom: '50px'})),
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
    query(':enter, :leave', style({width: '100%'})),
    query(':enter', style({position: 'fixed', transform: 'translateX(100%)'})),
    query(':leave', style({position: 'absolute', marginBottom: '50px'})),
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
