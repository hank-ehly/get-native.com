import { WordCountService } from './word-count.service';
/**
 * word-count.service.spec
 * get-native.com
 *
 * Created by henryehly on 2017/05/04.
 */

export function main() {
    let service: WordCountService;

    describe('WordCountService', () => {
        beforeEach(() => {
            service = new WordCountService();
        });

        describe('English', () => {
            it(`should count 'hello world' as 2 words`, () => {
                let actual = service.count('hello world');
                expect(actual).toEqual(2);
            });

            it(`should count 'This is my résumé in Español.' as 6 words`, () => {
                let actual = service.count('This is my résumé in Español.');
                expect(actual).toEqual(6);
            });

            it(`should count '...' as 0 words`, () => {
                let actual = service.count('...');
                expect(actual).toEqual(0);
            });

            it(`should count "I'm Hank" as 2 words`, () => {
                let actual = service.count(`I'm Hank.`);
                expect(actual).toEqual(2);
            });

            it(`should count 'Hello\\tWorld\\n' as 2 words`, () => {
                let actual = service.count('Hello   World\n');
                expect(actual).toEqual(2);
            });

            it(`should count 'I am Bob' as 3 words`, () => {
                let actual = service.count('I am Bob');
                expect(actual).toEqual(3);
            });
        });

        describe('Japanese', () => {
            it(`should count 'こんにちは' as 5 characters`, () => {
                let actual = service.count('こんにちは', 'ja');
                expect(actual).toEqual(5);
            });

            it(`should count '。。。' as 0 characters`, () => {
                let actual = service.count('。。。', 'ja');
                expect(actual).toEqual(0);
            });

            it(`should count 'こんにちは。' as 5 characters`, () => {
                let actual = service.count('こんにちは。', 'ja');
                expect(actual).toEqual(5);
            });

            it(`should count 'これ、何？' as 3 characters`, () => {
                let actual = service.count('これ、何？', 'ja');
                expect(actual).toEqual(3);
            });
        });
    });
}
