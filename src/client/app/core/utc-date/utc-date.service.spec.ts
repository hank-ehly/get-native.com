/**
 * date.service.spec
 * get-native.com
 *
 * Created by henryehly on 2016/12/31.
 */

import { UTCDateService } from './utc-date.service';

export function main() {
    let service: UTCDateService;
    let datetime: string;
    let date: Date;

    describe('UTCDateService', () => {
        beforeAll(() => {
            service = new UTCDateService();
            datetime = 'Thu Dec 14 04:35:55 +0000 2017';
            date = service.parse(datetime);
        });

        it('should parse UTC datetime string into a JavaScript Date object.', () => {
            expect(typeof date).toEqual('object');
        });

        it('should parse the correct year', () => {
            expect(date.getUTCFullYear()).toEqual(2017);
        });

        it('should parse the correct month', () => {
            expect(date.getUTCMonth()).toEqual(11);
        });

        it('should parse the correct date', () => {
            expect(date.getUTCDate()).toEqual(14);
        });

        it('should parse the correct hour', () => {
            expect(date.getUTCHours()).toEqual(4);
        });

        it('should parse the correct minute', () => {
            expect(date.getUTCMinutes()).toEqual(35);
        });

        it('should parse the correct second', () => {
            expect(date.getUTCSeconds()).toEqual(55);
        });

        it('should provide the string representation of the parsed day of the week', () => {
            expect(service.getWeekDay(date)).toEqual('Thu');
        });

        it('should provide the text representation of the parsed month', () => {
            expect(service.getTextMonth(date)).toEqual('Dec');
        });

        it('should create a Date object from seconds', () => {
            let date = service.dateFromSeconds(68);
            expect(date.getSeconds()).toEqual(8);
            expect(date.getMinutes()).toEqual(1);
        });
    });
}
