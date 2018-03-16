/**
 * listening.component
 * getnative.org
 *
 * Created by henryehly on 2016/12/11.
 */

import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { StudySessionService } from '../../core/study-session/study-session.service';
import { StudySessionSection } from '../../core/typings/study-session-section';
import { Logger } from '../../core/logger/logger';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import { VideoPlayerComponent } from '../../shared/video-player/video-player.component';

@Component({
    templateUrl: 'listening.component.html',
    styleUrls: ['listening.component.scss']
})
export class ListeningComponent implements OnInit, OnDestroy {

    src = this.session.current.video.video_url;
    transcripts = this.session.current.video.transcripts;
    youtubeVideoId = this.session.current.video.youtube_video_id;
    @ViewChild(VideoPlayerComponent) player: VideoPlayerComponent;

    private OnDestroy$ = new Subject<void>();

    constructor(private logger: Logger, private session: StudySessionService) {
    }

    ngOnInit(): void {
        this.logger.debug(this, 'OnInit');
        this.session.startSectionTimer();
        this.session.timeLeftEmitted$.takeUntil(this.OnDestroy$).filter(time => time === 0).subscribe(this.onSectionFinished.bind(this));
        this.session.sectionTimerPausedEmitted$.takeUntil(this.OnDestroy$).subscribe(this.onSectionTimerPaused.bind(this));
        this.session.sectionTimerResumedEmitted$.takeUntil(this.OnDestroy$).subscribe(this.onSectionTimerResumed.bind(this));
    }

    ngOnDestroy(): void {
        this.logger.debug(this, 'OnDestroy');
        this.OnDestroy$.next();
    }

    private onSectionFinished(): void {
        this.logger.debug(this, 'listening time finished');
        this.session.transition(StudySessionSection.Shadowing);
    }

    private onSectionTimerPaused(): void {
        this.logger.debug(this, 'onSectionTimerPaused');
        this.player.pause();
    }

    private onSectionTimerResumed(): void {
        this.logger.debug(this, 'onSectionTimerResumed');
        this.player.play();
    }

}
