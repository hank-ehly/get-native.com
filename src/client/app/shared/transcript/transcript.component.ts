/**
 * transcript.component
 * get-native.com
 *
 * Created by henryehly on 2016/12/09.
 */

import { Component, OnInit } from '@angular/core';

import { Logger } from '../../core/index';

@Component({
    moduleId: module.id,
    selector: 'gn-transcript',
    templateUrl: 'transcript.component.html',
    styleUrls: ['transcript.component.css']
})
export class TranscriptComponent implements OnInit {
    tabTitles: string[] = ['Original Transcript', 'English', '日本語'];
    activeTabTitle: string;
    activeTabElement: HTMLElement;

    constructor(private logger: Logger) {
        this.activeTabTitle = this.tabTitles[0];
    }

    ngOnInit() {
        this.logger.info('[TranscriptComponent] ngOnInit()');
    }

    onClickTabTitle(title: string, e: MouseEvent): void {
        this.logger.debug(`[TranscriptComponent] onClickTabTitle(title: ${title}, event: ${e})`);
        this.activeTabTitle = title;
        this.activeTabElement = <HTMLElement>e.target;
    }

    get sliderPosition() {
        if (!this.activeTabElement) {
            return null;
        }

        return {
            left: `${this.activeTabElement.offsetLeft}px`,
            width: `${this.activeTabElement.offsetWidth}px`
        };
    }
}
