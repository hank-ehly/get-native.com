/**
 * listening.component
 * get-native.com
 *
 * Created by henryehly on 2016/12/11.
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Transcripts } from '../../core/entities/transcripts';
import { Logger } from '../../core/logger/logger';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/pluck';

@Component({
    moduleId: module.id,
    templateUrl: 'listening.component.html',
    styleUrls: ['listening.component.css']
})
export class ListeningComponent implements OnInit {
    transcripts$: Observable<Transcripts>;
    videoUrl$: Observable<string>;

    constructor(private logger: Logger, private route: ActivatedRoute) {
        this.videoUrl$    = this.route.data.pluck('video', 'url');
        this.transcripts$ = this.route.data.pluck('video', 'transcripts');
    }

    ngOnInit() {
        this.logger.debug(this, 'OnInit');
    }
}
