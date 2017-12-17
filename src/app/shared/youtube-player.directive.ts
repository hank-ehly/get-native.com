import { AfterViewInit, Directive, ElementRef, Inject, Input, LOCALE_ID, OnDestroy, OnInit } from '@angular/core';

import { LangService } from '../core/lang/lang.service';

import { Logger } from '../core/logger/logger';
import * as _ from 'lodash';

@Directive({
    selector: '[gnYoutubeVideo]'
})
export class YoutubePlayerDirective implements OnInit, AfterViewInit, OnDestroy {

    api: any;

    @Input() width: number;
    @Input() height: number;
    @Input() loop: boolean;
    @Input() videoId: string;
    @Input() playerVars: any;
    @Input() events: any;

    get playerState(): number {
        if (_.has(this, 'api.getPlayerState')) {
            return this.api.getPlayerState();
        }
        return -1;
    }

    get buffered(): number {
        if (_.has(this, 'api.getVideoLoadedFraction')) {
            return this.api.getVideoLoadedFraction();
        }
        return 0;
    }

    get seek(): number {
        if (_.has(this, 'api.getCurrentTime') && _.has(this, 'api.getDuration')) {
            return this.api.getCurrentTime() / this.api.getDuration();
        }
        return 0;
    }

    get muted(): boolean {
        if (_.has(this, 'api.isMuted')) {
            return this.api.isMuted();
        }
        return false;
    }

    get duration(): number {
        if (_.has(this, 'api.getDuration')) {
            return this.api.getDuration();
        }
        return 0;
    }

    get currentTime(): number {
        if (_.has(this, 'api.getCurrentTime')) {
            return this.api.getCurrentTime();
        }
        return 0;
    }

    get volume(): number {
        if (_.has(this, 'api.getVolume')) {
            return this.api.getVolume();
        }
        return 0;
    }

    set volume(value: number) {
        if (_.has(this, 'api.setVolume')) {
            this.api.setVolume(_.clamp(value, 0, 100));
        }
    }

    constructor(private el: ElementRef, private logger: Logger, @Inject(LOCALE_ID) private localeId: string,
                private langService: LangService) {
    }

    seekTo(value: number): void {
        if (_.has(this, 'api.seekTo')) {
            this.api.seekTo(_.floor(value), true);
        }
    }

    ngOnInit(): void {
        (<any>window).onYouTubeIframeAPIReady = this.onYouTubeIframeAPIReady.bind(this);
    }

    ngAfterViewInit(): void {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        document.body.appendChild(tag);
    }

    ngOnDestroy(): void {
        this.logger.debug(this, 'OnDestroy');
        /*if (_.has(this, 'api.destroy')) {
            this.api.destroy();
        }*/
    }

    private onYouTubeIframeAPIReady(): void {
        this.api = new YT.Player(this.el.nativeElement.id, {
            height: this.height,
            width: this.width,
            videoId: this.videoId,
            playerVars: {
                version: 3,
                modestbranding: 1,
                controls: 0,
                enablejsapi: 1,
                rel: 0,
                loop: this.loop ? 1 : 0,
                autoplay: 1,
                playlist: this.videoId,
                hl: this.langService.languageForLocaleId(this.localeId)
            },
            events: {
                'onReady': this.onPlayerReady.bind(this),
                'onStateChange': this.onPlayerStateChange.bind(this)
            }
        });
    }

    private onPlayerReady(e: any): void {
        this.logger.debug(this, 'onPlayerReady', e);
    }

    private onPlayerStateChange(e: any): void {
        this.logger.debug(this, 'onPlayerStateChange', e);
    }

}
