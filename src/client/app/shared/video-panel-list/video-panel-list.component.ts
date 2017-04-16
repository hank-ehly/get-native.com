/**
 * video-panel-list.component
 * get-native.com
 *
 * Created by henryehly on 2017/01/12.
 */

import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Logger } from '../../core/logger/logger';
import { Video } from '../../core/entities/video';

@Component({
    moduleId: module.id,
    selector: 'gn-video-panel-list',
    templateUrl: 'video-panel-list.component.html',
    styleUrls: ['video-panel-list.component.css']
})
export class VideoPanelListComponent {
    get videos(): Video[] {
        return this._videos;
    }

    @Input() set videos(videos: Video[]) {
        if (!videos) {
            this._videos = [];
            return;
        }

        // todo: use lodash
        if (videos.length % 3 !== 0) {
            let records: Video[] = videos;
            let diff = 3 - (videos.length % 3);
            let i = 0;

            while (i < diff) {
                records.push({});
                i++;
            }

            this._videos = records;
        } else {
            this._videos = videos;
        }
    }

    @Input() navigates: boolean = false;
    @Input() controls: boolean = false;

    private _videos: Video[];

    constructor(private logger: Logger, private router: Router) {
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
