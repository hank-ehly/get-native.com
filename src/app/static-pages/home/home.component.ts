/**
 * home.component
 * getnativelearning.com
 *
 * Created by henryehly on 2016/11/06.
 */

import { Component, HostListener, OnInit } from '@angular/core';

import { Logger } from '../../core/logger/logger';

import * as _ from 'lodash';

@Component({
    selector: 'gn-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss']
})
export class HomeComponent implements OnInit {

    bannerBackgroundPositionY: number;

    startY = [100, 450, 800];
    xOffset = [0, 0, 0];
    opacity = [0, 0, 0];


    @HostListener('window:scroll') onScroll() {
        this.animateLargeFeatures();
        this.animateParallaxBanner();
    }

    constructor(private logger: Logger) {
    }

    ngOnInit(): void {
        this.animateParallaxBanner();
    }

    private animateLargeFeatures(): void {
        const xMovement = 25;
        for (let i = 0; i < this.startY.length; i++) {
            const startY = this.startY[i];
            const endY = startY + 800;
            const percent = this.findPercentageOfXBetweenAAndB(<number>window.scrollY, startY, endY);
            this.xOffset[i] = this.findPointOfPercentageBetweenAAndB(percent, 0, xMovement) - xMovement;
            this.opacity[i] = percent / 100;
        }
    }

    private animateParallaxBanner(): void {
        const percentOfHeightScrolled = this.findPercentageOfXBetweenAAndB(<number>window.scrollY, 0, window.innerHeight);
        const n = _.floor(this.findPointOfPercentageBetweenAAndB(percentOfHeightScrolled, 0, window.innerHeight / 3));
        this.bannerBackgroundPositionY = _.floor(n - (window.innerHeight / 5));
        this.logger.debug(this, this.bannerBackgroundPositionY);
    }

    private findPercentageOfXBetweenAAndB(x: number, a: number, b: number): number {
        const percentage = _.floor(((x - a) / (b - a)) * 100);
        return _.clamp(percentage, 0, 100);
    }

    private findPointOfPercentageBetweenAAndB(p: number, a: number, b: number) {
        return (p / 100) * (b - a);
    }

}
