/**
 * lang.service.spec
 * getnative.org
 *
 * Created by henryehly on 2016/12/29.
 */

import { LangService } from './lang.service';
import { Languages } from './languages';

import * as _ from 'lodash';

describe('LangService', () => {
    let service: LangService;

    beforeAll(() => {
        service = new LangService('en-US');
    });

    it('should convert \'en\' to \'English\'', () => {
        const expected = 'English';
        const actual = service.codeToName('en');
        expect(actual).toEqual(expected);
    });

    it('should convert \'ja\' to \'日本語\'', () => {
        const expected = '日本語';
        const actual = service.codeToName('ja');
        expect(actual).toEqual(expected);
    });

    it('should return the appropriate Language given a language code', () => {
        const expected = _.first(Languages);

        const langCode = _.first(Languages).code;
        const actual = service.languageForCode(langCode);

        expect(actual).toEqual(expected);
    });

    it('should return the correct for the given locale', () => {
        const localeId = 'ja';
        expect(service.languageForLocaleId(localeId)).toEqual(_.find(Languages, {code: localeId}));
    });

    it('should return the default language if the localeId does not conform', () => {
        const localeId = 'en-US';
        expect(service.languageForLocaleId(localeId)).toEqual(_.find(Languages, {code: 'en'}));
    });
});
