/**
 * listening.component
 * get-native.com
 *
 * Created by henryehly on 2016/12/11.
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { StudyProgressService } from '../../core/study-progress/study-progress.service';
import { Transcripts } from '../../core/entities/transcripts';
import { Logger } from '../../core/logger/logger';

import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/take';

@Component({
    moduleId: module.id,
    templateUrl: 'listening.component.html',
    styleUrls: ['listening.component.css']
})
export class ListeningComponent implements OnInit, OnDestroy {
    transcripts$: Observable<Transcripts>;
    videoUrl$: Observable<string>;

    timer = IntervalObservable.create(1000).take(4);

    constructor(private logger: Logger, private route: ActivatedRoute, private progress: StudyProgressService) {
        this.videoUrl$    = this.route.data.pluck('video', 'url');
        this.transcripts$ = this.route.data.pluck('video', 'transcripts');
    }

    ngOnInit(): void {
        this.logger.debug(this, 'OnInit');
        this.timer.subscribe(this.progress.listening$);
    }

    ngOnDestroy(): void {
        this.logger.debug(this, 'OnDestroy');
    }
}
