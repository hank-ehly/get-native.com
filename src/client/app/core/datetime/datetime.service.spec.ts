/**
 * datetime.service.spec
 * get-native.com
 *
 * Created by henryehly on 2016/12/28.
 */

import { DateTimeService } from './datetime.service';
import { DateTime } from '../typings/datetime';

export function main() {
    let service: DateTimeService;
    let timestamp: DateTime;

    describe('DateTimeService', () => {
       beforeAll(() => {
           service = new DateTimeService();
           timestamp = 'Sat Dec 14 04:35:55 +0000 2017';
       });

       it('should get the day in word format', () => {
           let actual = service.getWordDay(timestamp);
           expect(actual).toEqual('St');
       });

       it('should get the month in word format', () => {
           let actual = service.getWordMonth(timestamp);
           expect(actual).toEqual('Dec');
       });

       it('should get the number day', () => {
           let actual = service.getNumericDay(timestamp);
           expect(actual).toEqual('14');
       });

       it('should get the time', () => {
           let actual = service.getTime(timestamp);
           expect(actual).toEqual('04:35:55');
       });

       it('should get the timezone', () => {
           let actual = service.getTimeZone(timestamp);
           expect(actual).toEqual('+0000');
       });

       it('should get the year', () => {
           let actual = service.getYear(timestamp);
           expect(actual).toEqual('2017');
       });
    });
}
