/**
 * help.component
 * get-native.com
 *
 * Created by henryehly on 2016/11/08.
 */

import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Faq, FaqService } from './faq/index';

@Component({
    moduleId: module.id,
    selector: 'gn-help',
    templateUrl: 'help.component.html',
    styleUrls: ['help.component.css'],
    animations: [
        trigger('visible', [
            transition(':enter', [
                style({
                    opacity: 0
                }),
                animate(300, style({
                    opacity: 1
                }))]),
            transition(':leave', [
                animate(0, style({
                    opacity: 0
                }))])
        ]),
        trigger('rotation', [
            state('collapsed', style({
                transform: 'rotate(0)'
            })),
            state('expanded', style({
                transform: 'rotate(90deg)'
            })),
            transition('collapsed => expanded', animate(100)),
            transition('expanded => collapsed', animate(0))
        ])
    ]
})

export class HelpComponent implements OnInit {
    faqs: Faq[];
    moderator: string = 'getnative.moderator@gmail.com';
    selectedFaq: Faq;

    constructor(private faqService: FaqService) {
        this.selectedFaq = null;
    }

    ngOnInit(): void {
        this.faqs = this.faqService.getFaqs();
    }

    setSelectedFaq(faq: Faq): void {
        this.selectedFaq = this.isSelectedFaq(faq) ? null : faq;
    }

    isSelectedFaq(faq: Faq): boolean {
        return this.selectedFaq === faq;
    }

    chevronRotationForFaq(faq: Faq): string { // Use enum for state
        return this.isSelectedFaq(faq) ? 'expanded' : 'collapsed';
    }
}
