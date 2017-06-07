/**
 * lang.service.spec
 * get-native.com
 *
 * Created by henryehly on 2016/12/29.
 */

import { LangService } from './lang.service';
import { Languages } from './languages';

import * as _ from 'lodash';

export function main() {
    let service: LangService;

    describe('LangService', () => {
        beforeAll(() => {
            service = new LangService();
        });

        it('should convert \'en\' to \'English\'', () => {
            let expected = 'English';
            let actual = service.codeToName('en');
            expect(actual).toEqual(expected);
        });

        it('should convert \'ja\' to \'日本語\'', () => {
            let expected = '日本語';
            let actual = service.codeToName('ja');
            expect(actual).toEqual(expected);
        });

        it('should return the appropriate Language given a language code', () => {
            let expected = _.first(Languages);

            let langCode = _.first(Languages).code;
            let actual = service.languageForCode(langCode);

            expect(actual).toEqual(expected);
        });
    });
}
