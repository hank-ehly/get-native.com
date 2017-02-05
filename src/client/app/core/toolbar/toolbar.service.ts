/**
 * toolbar.service
 * get-native.com
 *
 * Created by henryehly on 2017/02/05.
 */

import { Injectable } from '@angular/core';

import { Logger, LangCode, LangCodeNamePair } from '../index';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ToolbarService {
    selectLanguage$: Observable<LangCode>;
    private selectLanguageSource: Subject<LangCode>;

    constructor(private logger: Logger) {
        this.selectLanguageSource = new Subject<LangCode>();
        this.selectLanguage$ = this.selectLanguageSource.asObservable();
    }

    didSelectLanguage(lang: LangCodeNamePair): void {
        // Todo: Check language code exists

        this.logger.debug(`[${this.constructor.name}] Selected '${lang.name}' language.`);
        this.selectLanguageSource.next(lang.code);
    }
}
