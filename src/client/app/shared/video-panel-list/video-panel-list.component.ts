/**
 * video-panel-list.component
 * get-native.com
 *
 * Created by henryehly on 2017/01/12.
 */

import { Component, OnInit, Input, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Logger, Videos, Video } from '../../core/index';

@Component({
    moduleId: module.id,
    selector: 'gn-video-panel-list',
    templateUrl: 'video-panel-list.component.html',
    styleUrls: ['video-panel-list.component.css']
})
export class VideoPanelListComponent implements OnInit, OnChanges {
    @Output() clickOverlay: EventEmitter<Video>;
    @Input() videos: Videos;
    @Input() navigates: boolean;
    @Input() controls: boolean;

    constructor(private logger: Logger, private router: Router) {
        this.clickOverlay = new EventEmitter<Video>();
        this.navigates    = false;
        this.controls     = false;
    }

    ngOnInit(): void {
        this.logger.debug(`[${this.constructor.name}] OnInit()`);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['videos']) {
            this.onVideosChange(<Videos>changes['videos'].currentValue);
        }
    }

    onVideosChange(videos: Videos): void {
        if (videos.count % 3 !== 0) {
            let records: Video[] = videos.records;
            let diff = 3 - (videos.count % 3);
            let i = 0;

            while (i < diff) {
                records.push({});
                i++;
            }

            let count = records.length;
            this.videos = {records: records, count: count};
        } else {
            this.videos = videos;
        }
    }

    onClickOverlay(video: Video): void {
        if (!this.navigates) {
            return;
        }

        this.logger.debug(`[${this.constructor.name}] onClickOverlay(${video.id_str})`);
        this.router.navigate(['library', video.id_str]).then(isFulfilled => {
            this.logger.debug(`[${this.constructor.name}] navigation fulfilled = ${isFulfilled}`);
        });
    }
}
