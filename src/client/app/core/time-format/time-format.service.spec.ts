/**
 * time-format.service.spec
 * get-native.com
 *
 * Created by henryehly on 2016/12/16.
 */

import { TimeFormatService } from './time-format.service';

export function main() {
    let service: TimeFormatService;

    describe('TimeFormatService', () => {
        beforeAll(() => {
            service = new TimeFormatService();
        });

        it('should format the DOMHighResTimeStamp (7.846841) into human-readable seconds (0:07)', () => {
            let result = service.fromSeconds(7.846841);
            expect(result).toEqual('0:07');
        });

        it('should format the DOMHighResTimeStamp (15.839955) into human-readable seconds (0:15)', () => {
            let result = service.fromSeconds(15.839955);
            expect(result).toEqual('0:15');
        });

        it('should format the DOMHighResTimeStamp (64.528073) into human-readable seconds (1:04)', () => {
            let result = service.fromSeconds(64.528073);
            expect(result).toEqual('1:04');
        });
    });
}
