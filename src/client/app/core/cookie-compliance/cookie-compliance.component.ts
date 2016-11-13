/**
 * cookie-compliance.component
 * get-native.com
 *
 * Created by henryehly on 2016/11/11.
 */

import {
    Component,
    Output,
    EventEmitter,
    animate,
    style,
    transition,
    trigger,
    keyframes,
    AnimationTransitionEvent
} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'gn-cookie-compliance',
    templateUrl: 'cookie-compliance.component.html',
    styleUrls: ['cookie-compliance.component.css'],
    animations: [
        trigger('comply', [
            transition(':leave', [
                animate(200, keyframes([
                    style({opacity: 1, transform: 'translateY(0)', offset: 0}),
                    style({opacity: 1, transform: 'translateY(-10px)', offset: 0.7}),
                    style({opacity: 0, transform: 'translateY(100%)', offset: 1.0})
                ]))
            ])
        ])
    ]
})

export class CookieComplianceComponent {
    @Output() didEndComplyAnimation = new EventEmitter();
    isCompliant: boolean = false;

    close() {
        this.isCompliant = true;
    }

    complyAnimationDone(event: AnimationTransitionEvent): void {
        if (event.toState === 'void') {
            this.didEndComplyAnimation.emit();
        }
    }
}
