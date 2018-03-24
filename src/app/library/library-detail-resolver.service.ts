import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Inject, Injectable, LOCALE_ID, PLATFORM_ID } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
import { HttpParams } from '@angular/common/http';

import { GNRequestOptions } from '../core/http/gn-request-options';
import { HttpService } from '../core/http/http.service';
import { LangService } from '../core/lang/lang.service';
import { UserService } from '../core/user/user.service';
import { Entities } from '../core/entities/entities';
import { APIHandle } from '../core/http/api-handle';
import { Entity } from '../core/entities/entity';
import { Logger } from '../core/logger/logger';
import { Video } from '../core/entities/video';

import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

@Injectable()
export class LibraryDetailResolverService implements Resolve<Entity | Entities<Entity>> {

    constructor(private user: UserService,
                private lang: LangService,
                @Inject(LOCALE_ID) private localeId: string,
                @Inject(PLATFORM_ID) private platformId: Object,
                private http: HttpService,
                private logger: Logger,
                private meta: Meta,
                private titleService: Title) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Entity | Entities<Entity>> {
        const id = _.toNumber(_.get(route.params, 'id'));

        if (!id) {
            this.logger.debug(this, 'No id found in route.params');
            return;
        }

        const options: GNRequestOptions = {
            replace: {
                id: id
            }
        };

        if (!this.user.isAuthenticated()) {
            const params = new HttpParams();
            options.params = params.set('lang', this.lang.languageForLocaleId(this.localeId).code);
        }

        return this.http.request(APIHandle.VIDEO, options).do(this.updateMetaWithVideo.bind(this));
    }

    /* Try moving this to onInit and see if that makes a difference on stg/prd */
    private updateMetaWithVideo(video: Video): void {
        const imageUrl = `https://i.ytimg.com/vi/${video.youtube_video_id}/maxresdefault.jpg`;
        this.updateOrAdd({content: imageUrl, name: 'og:image'}, `name='og:image'`);
        this.updateOrAdd({content: imageUrl, name: 'og:image:url'}, `name='og:image:url'`);
        this.updateOrAdd({content: imageUrl, name: 'og:image:secure_url'}, `name='og:image:secure_url'`);

        this.titleService.setTitle('getnative | ' + video.subcategory.name);
    }

    private updateOrAdd(tag: MetaDefinition, selector?: string): void {
        if (isPlatformBrowser(this.platformId)) {
            if (this.meta.getTag(selector)) {
                this.meta.updateTag(tag, selector);
            } else {
                this.meta.addTag(tag);
            }
        }
    }

}
