/**
 * home.component
 * getnativelearning.com
 *
 * Created by henryehly on 2016/11/06.
 */

import { Component, HostListener } from '@angular/core';

import { Logger } from '../../core/logger/logger';

import * as _ from 'lodash';

@Component({
    selector: 'gn-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss']
})
export class HomeComponent {

    bannerBackgroundPositionY = 600;

    startY  = [0, 300, 600];
    xOffset = [0,   0,   0];
    opacity = [0,   0,   0];

    @HostListener('window:scroll') onScroll() {
        this.animateLargeFeatures();
        this.animateParallaxBanner();
    }

    constructor(private logger: Logger) {
    }

    private animateLargeFeatures(): void {
        const xMovement = 25;
        for (let i = 0; i < this.startY.length; i++) {
            const startY = this.startY[i];
            const endY = startY + 600;
            const percent = this.findPercentageOfXBetweenAAndB(<number>window.scrollY, startY, endY);
            this.xOffset[i] = this.findPointOfPercentageBetweenAAndB(percent, 0, xMovement) - xMovement;
            this.opacity[i] = percent / 100;
        }
    }

    private animateParallaxBanner(): void {
        const percentOfHeightScrolled = this.findPercentageOfXBetweenAAndB(<number>window.scrollY, 0, window.innerHeight);
        const n = _.floor(this.findPointOfPercentageBetweenAAndB(percentOfHeightScrolled, 0, window.innerHeight / 4));
        this.bannerBackgroundPositionY = n - (window.innerHeight / 2);
    }

    private findPercentageOfXBetweenAAndB(x: number, a: number, b: number): number {
        const percentage = _.floor(((x - a) / (b - a)) * 100);
        return _.clamp(percentage, 0, 100);
    }

    private findPointOfPercentageBetweenAAndB(p: number, a: number, b: number) {
        return (p / 100) * (b - a);
    }

}
