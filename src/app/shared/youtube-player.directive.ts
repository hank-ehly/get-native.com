import {
    AfterViewInit, Directive, ElementRef, Inject, Input, LOCALE_ID, OnChanges, OnDestroy, OnInit, PLATFORM_ID,
    SimpleChanges
} from '@angular/core';

import { LangService } from '../core/lang/lang.service';
import { Logger } from '../core/logger/logger';

import * as _ from 'lodash';
import { isPlatformBrowser } from '@angular/common';

@Directive({
    selector: '[gnYoutubePlayer]'
})
export class YoutubePlayerDirective implements OnInit, AfterViewInit, OnDestroy, OnChanges {

    api: any;

    @Input() width = 435;
    @Input() height = 280;
    @Input() loop = true;
    @Input() autoplay = true;
    @Input() videoId: string;

    get playerState(): number {
        if (_.has(this, 'api.getPlayerState')) {
            return this.api.getPlayerState();
        }
        return -1;
    }

    get buffered(): number {
        if (_.has(this, 'api.getVideoLoadedFraction')) {
            return this.api.getVideoLoadedFraction() || 0;
        }
        return 0;
    }

    get seek(): number {
        if (_.has(this, 'api.getCurrentTime') && _.has(this, 'api.getDuration')) {
            return (this.api.getCurrentTime() / this.api.getDuration()) || 0;
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
                private langService: LangService, @Inject(PLATFORM_ID) private platformId: Object) {
        if (isPlatformBrowser(this.platformId)) {
            (<any>window).onYouTubeIframeAPIReady = this.onYouTubeIframeAPIReady.bind(this);
        }
    }

    ngOnInit(): void {
        this.logger.debug(this, 'OnInit');
    }

    ngAfterViewInit(): void {
        this.logger.debug(this, 'AfterViewInit');
        this.loadYouTubeIframeAPIIfNeeded();
    }

    ngOnDestroy(): void {
        this.logger.debug(this, 'OnDestroy');
        if (_.has(this, 'api.destroy')) {
            this.api.destroy();
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.logger.debug(this, 'OnChanges', changes);

        if (changes['videoId'] && _.has(this, 'api.loadVideoById')) {
            setTimeout(() => {
                this.api.loadVideoById(changes['videoId'].currentValue, 0);
            }, 0);
        }
    }

    seekTo(value: number): void {
        if (_.has(this, 'api.seekTo')) {
            this.api.seekTo(_.floor(value), true);
        }
    }

    playVideo(): void {
        if (_.has(this, 'api.playVideo')) {
            this.api.playVideo();
        }
    }

    pauseVideo(): void {
        if (_.has(this, 'api.pauseVideo')) {
            this.api.pauseVideo();
        }
    }

    private loadYouTubeIframeAPIIfNeeded() {
        if (isPlatformBrowser(this.platformId)) {
            const iframeAPIScriptTagID = 'youtube-iframe-api';
            if (document.getElementById(iframeAPIScriptTagID)) {
                this.logger.debug(this, 'YouTube Iframe API is already loaded');
                this.onYouTubeIframeAPIReady();
            } else {
                this.logger.debug(this, 'Loading YouTube Iframe API');
                const tag = document.createElement('script');
                tag.type = 'text/javascript';
                tag.src = 'https://www.youtube.com/iframe_api';
                tag.id = iframeAPIScriptTagID;
                document.body.appendChild(tag);
            }
        }
    }

    private onYouTubeIframeAPIReady(): void {
        if (isPlatformBrowser(this.platformId)) {
            if (!window['YT']) {
                return;
            }
        }

        this.logger.debug(this, 'onYouTubeIframeAPIReady');
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
                autoplay: this.autoplay ? 1 : 0,
                playlist: this.videoId,
                hl: this.langService.languageForLocaleId(this.localeId).code
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
