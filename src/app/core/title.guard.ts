import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { translateKey } from '../meta-factory';
import { LangService } from './lang/lang.service';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class TitleGuard implements CanActivate, CanActivateChild {

    constructor(private titleService: Title, @Inject(LOCALE_ID) private localeId: string, private langService: LangService) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (next.data['title']) {
            const langCode = this.langService.languageForLocaleId(this.localeId).code;
            const localizedTitle = translateKey(langCode, next.data['title']);
            const newTitle = next.data['overrideTitle'] ? localizedTitle : 'getnative | ' + localizedTitle;

            this.titleService.setTitle(newTitle);
        }

        return true;
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.canActivate(childRoute, state);
    }

}
