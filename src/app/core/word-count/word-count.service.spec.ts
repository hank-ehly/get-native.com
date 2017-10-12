/**
 * word-count.service.spec
 * getnativelearning.com
 *
 * Created by henryehly on 2017/05/04.
 */

import { WordCountService } from './word-count.service';

describe('WordCountService', () => {
    let service: WordCountService;

    beforeEach(() => {
        service = new WordCountService();
    });

    describe('English', () => {
        it(`should count 'hello world' as 2 words`, () => {
            const actual = service.count('hello world');
            expect(actual).toEqual(2);
        });

        it(`should count 'This is my résumé in Español.' as 6 words`, () => {
            const actual = service.count('This is my résumé in Español.');
            expect(actual).toEqual(6);
        });

        it(`should count '...' as 0 words`, () => {
            const actual = service.count('...');
            expect(actual).toEqual(0);
        });

        it(`should count "I'm Hank" as 2 words`, () => {
            const actual = service.count(`I'm Hank.`);
            expect(actual).toEqual(2);
        });

        it(`should count 'Hello\\tWorld\\n' as 2 words`, () => {
            const actual = service.count('Hello   World\n');
            expect(actual).toEqual(2);
        });

        it(`should count 'I am Bob' as 3 words`, () => {
            const actual = service.count('I am Bob');
            expect(actual).toEqual(3);
        });
    });

    describe('Japanese', () => {
        it(`should count 'こんにちは' as 5 characters`, () => {
            const actual = service.count('こんにちは', 'ja');
            expect(actual).toEqual(5);
        });

        it(`should count '。。。' as 0 characters`, () => {
            const actual = service.count('。。。', 'ja');
            expect(actual).toEqual(0);
        });

        it(`should count 'こんにちは。' as 5 characters`, () => {
            const actual = service.count('こんにちは。', 'ja');
            expect(actual).toEqual(5);
        });

        it(`should count 'これ、何？' as 3 characters`, () => {
            const actual = service.count('これ、何？', 'ja');
            expect(actual).toEqual(3);
        });
    });
});
