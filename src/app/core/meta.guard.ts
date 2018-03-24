import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Inject, Injectable, LOCALE_ID, PLATFORM_ID } from '@angular/core';
import { Meta, MetaDefinition } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';

import { LangService } from './lang/lang.service';
import { translateKey } from '../meta-factory';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class MetaGuard implements CanActivate {

    constructor(private langService: LangService,
                private meta: Meta,
                @Inject(LOCALE_ID) private localeId,
                @Inject(PLATFORM_ID) private platformId: Object) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const routeMeta = next.data['meta'];

        if (routeMeta) {
            for (const key in routeMeta) {
                if (routeMeta.hasOwnProperty(key)) {
                    this.updateOrAdd({name: key, content: routeMeta[key]}, `name='${key}'`);
                }
            }
        }

        const langCode = this.langService.languageForLocaleId(this.localeId).code;
        const localizedTitle = translateKey(langCode, next.data['title']);
        this.updateOrAdd({name: 'twitter:title', content: localizedTitle}, `name='twitter:title'`);
        this.updateOrAdd({name: 'og:locale', content: this.localeId}, `name='og:locale`);

        if (isPlatformBrowser(this.platformId)) {
            this.updateOrAdd({name: 'og:url', content: window.location.href}, `name='og:url'`);
        }

        return true;
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.canActivate(childRoute, state);
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
