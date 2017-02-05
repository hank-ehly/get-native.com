/**
 * toolbar.service
 * get-native.com
 *
 * Created by henryehly on 2017/02/05.
 */

import { Injectable } from '@angular/core';

import { Logger, Language } from '../index';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ToolbarService {
    selectLanguage$: Observable<Language>;
    private selectLanguageSource: Subject<Language>;

    constructor(private logger: Logger) {
        this.selectLanguageSource = new Subject<Language>();
        this.selectLanguage$ = this.selectLanguageSource.asObservable();
    }

    didSelectLanguage(lang: Language): void {
        this.logger.debug(`[${this.constructor.name}] Selected '${lang.name}' language.`);
        this.selectLanguageSource.next(lang);
    }
}
