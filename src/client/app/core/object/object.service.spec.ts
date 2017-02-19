/**
 * object.service.spec
 * get-native.com
 *
 * Created by henryehly on 2017/02/18.
 */

import { ObjectService } from './object.service';
import { Languages } from '../lang/languages';

export function main() {
    let service: ObjectService;

    describe('ObjectService', () => {
        beforeEach(() => {
            service = new ObjectService();
        });

        it('For each object an array of objects, rename property X to Y', () => {
            let fixture = [{
                code: 'en',
                name: 'English'
            }, {
                code: 'ja',
                name: '日本語'
            }];

            let expected = [{
                value: 'en',
                title: 'English'
            }, {
                value: 'ja',
                title: '日本語'
            }];

            let actual = service.renameProperty(fixture, [['code', 'value'], ['name', 'title']]);

            expect(actual).toEqual(expected);
        });

        it('For a given object, rename property X to Y', () => {
            let fixture = {
                foo: 'foo',
                bar: 'bar'
            };

            let expected = {
                hip: 'foo',
                hop: 'bar'
            };

            let actual = service.renameProperty(fixture, [['foo', 'hip'], ['bar', 'hop']]);

            expect(actual).toEqual(expected);
        });

        it('Copies the target object', () => {
            const beforeLanguages = Languages;
            let alteredLanguages = service.renameProperty(beforeLanguages, [['code', 'foo']]);
            expect(beforeLanguages).not.toEqual(alteredLanguages);
        });
    });
}
