/**
 * video-panel-list.component
 * get-native.com
 *
 * Created by henryehly on 2017/01/12.
 */

import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

import { Logger } from '../../core/logger/logger';
import { Videos } from '../../core/entities/videos';
import { Video } from '../../core/entities/video';

@Component({
    moduleId: module.id,
    selector: 'gn-video-panel-list',
    templateUrl: 'video-panel-list.component.html',
    styleUrls: ['video-panel-list.component.css']
})
export class VideoPanelListComponent implements OnChanges {
    @Input() videos: Videos;
    @Input() navigates: boolean = false;
    @Input() controls: boolean = false;

    constructor(private logger: Logger, private router: Router) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['videos'] && changes['videos'].currentValue) {
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

        this.logger.debug(this, `onClickOverlay(${video.id})`);
        this.router.navigate(['library', video.id]).then(isFulfilled => {
            this.logger.debug(this, `navigation fulfilled = ${isFulfilled}`);
        });
    }
}
