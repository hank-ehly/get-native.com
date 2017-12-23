/**
 * router.animations
 * getnativelearning.com
 *
 * Created by henryehly on 2017/12/23.
 */
import { animate, animateChild, AnimationMetadata, group, query, sequence, style, transition, trigger } from '@angular/animations';

enum Direction {
    Up, Right, Down, Left
}

function scroll(direction): AnimationMetadata[] {
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
                    animate('650ms cubic-bezier(1,-0.3,0.26,1.15)', style({
                        transform: translation + '(' + ([Direction.Down, Direction.Right].includes(direction) ? '-' : '') + '100%)'
                    }))
                ]),
                query(':enter', [
                    style({
                        transform: translation + '(' + ([Direction.Up, Direction.Left].includes(direction) ? '-' : '') + '100%)'
                    }),
                    animate('650ms cubic-bezier(1,-0.3,0.26,1.15)', style({transform: translation + '(0%)'})),
                ]),
            ]),
            query(':enter', animateChild()),
        ])
    ];
}

export const routerTransition = trigger('routerTransition', [
    transition('dashboard => library', scroll(Direction.Up)),
    transition('library => dashboard', scroll(Direction.Down)),
    transition('library => library-detail', scroll(Direction.Right)),
    transition('library-detail => library', scroll(Direction.Left)),
    transition('library-detail => dashboard', scroll(Direction.Down)),

    transition('* => settings', [
        group([
            query(':enter, :leave', style({position: 'fixed', width: '100%'})
                , {optional: true}),
            query(':enter', [
                style({opacity: '0'}),
                animate('0.3s ease-in-out', style({opacity: '1'}))
            ], {optional: true}),
            query(':leave', [
                style({opacity: '1'}),
                animate('0.3s ease-in-out', style({opacity: '0'}))
            ], {optional: true}),
        ])
    ]),

    transition('settings => *', [
        group([
            query(':enter, :leave', style({position: 'fixed', width: '100%'})
                , {optional: true}),
            query(':enter', [
                style({opacity: '0'}),
                animate('0.3s ease-in-out', style({opacity: '1'}))
            ], {optional: true}),
            query(':leave', [
                style({opacity: '1'}),
                animate('0.3s ease-in-out', style({opacity: '0'}))
            ], {optional: true}),
        ])
    ])
]);
