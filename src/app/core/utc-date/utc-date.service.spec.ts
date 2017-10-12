/**
 * date.service.spec
 * getnativelearning.com
 *
 * Created by henryehly on 2016/12/31.
 */

import { UTCDateService } from './utc-date.service';

describe('UTCDateService', () => {
    let service: UTCDateService;
    let datetime: string;
    let date: Date;

    beforeAll(() => {
        service = new UTCDateService();
        datetime = 'Thu Dec 14 04:35:55 +0000 2017'; // 2017-03-22T23:06:38.000Z
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
        date = service.dateFromSeconds(68);
        expect(date.getSeconds()).toEqual(8);
        expect(date.getMinutes()).toEqual(1);
    });

    it('should add a leading zero to seconds', () => {
        const d9 = service.dateFromSeconds(9);
        const d10 = service.dateFromSeconds(10);
        const nine = service.getUTCPaddedSeconds(d9);
        const ten = service.getUTCPaddedSeconds(d10);
        expect(nine).toEqual('09');
        expect(ten).toEqual('10');
    });

    it('should return an integer value in milliseconds of X days since Y', () => {
        date = new Date(1486901331613);
        const actual = service.getDaysAgoFromDate(30, date);
        const expected = 1484309331613;

        expect(actual).toEqual(expected);
    });
});
