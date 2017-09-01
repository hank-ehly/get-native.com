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
        this.updateLargeFeatureImagePosition();
        this.updateBannerPosition();
    }

    @HostListener('window:resize') onResize() {
        this.updateLargeFeatureImagePosition();
        this.updateBannerPosition();
    }

    constructor(private logger: Logger) {
    }

    ngOnInit(): void {
        this.updateBannerPosition();
    }

    private updateLargeFeatureImagePosition(): void {
        const xMovement = 30;
        const span = 800;
        for (let i = 0; i < this.startY.length; i++) {
            const startY = this.startY[i];
            const endY = startY + span;
            const percent = this.findPercentageOfXBetweenAAndB(<number>window.scrollY, startY, endY);
            this.xOffset[i] = this.findPointOfPercentageBetweenAAndB(percent, 0, xMovement) - xMovement;
            this.opacity[i] = percent / 100;
        }
    }

    private updateBannerPosition(): void {
        // bias should increase relative to window width
        const bias = _.floor(window.innerWidth / 7.5);
        this.bannerBackgroundPositionY = (window.pageYOffset * 0.5) - bias;
    }

    private findPercentageOfXBetweenAAndB(x: number, a: number, b: number): number {
        const percentage = _.floor(((x - a) / (b - a)) * 100);
        return _.clamp(percentage, 0, 100);
    }

    private findPointOfPercentageBetweenAAndB(p: number, a: number, b: number) {
        return (p / 100) * (b - a);
    }

}
