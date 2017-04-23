/**
 * string.service.spec
 * get-native.com
 *
 * Created by henryehly on 2016/11/27.
 */

import { StringService } from './string.service';

export function main() {
    let stringService: StringService;

    describe('StringService', () => {
        beforeAll(() => {
            stringService = new StringService();
        });

        it('should recognize that a string contains a symbol', () => {
            let str = '(Parentheses)';
            let result = stringService.containsSymbol(str);
            expect(result).toEqual(true);
        });
        it('should recognize that a string doesn\'t contain a symbol', () => {
            let str = 'No_symbol';
            let result = stringService.containsSymbol(str);
            expect(result).toEqual(false);
        });

        it('should recognize that a string contains a number', () => {
            let str = 'Hell0';
            let result = stringService.containsNumeric(str);
            expect(result).toEqual(true);
        });
        it('should recognize that a string doesn\'t contain a number', () => {
            let str = 'No number';
            let result = stringService.containsNumeric(str);
            expect(result).toEqual(false);
        });

        it('should recognize that a string contains at least one uppercase alphabet character', () => {
            let str = 'One uppercase';
            let result = stringService.containsAlphaUC(str);
            expect(result).toEqual(true);
        });
        it('should recognize that a string doesn\'t contain any uppercase alphabet characters', () => {
            let str = 'all lowercase';
            let result = stringService.containsAlphaUC(str);
            expect(result).toEqual(false);
        });

        it('should recognize that a string contains at least one lowercase alphabet character', () => {
            let str = 'HELLO world';
            let result = stringService.containsAlphaLC(str);
            expect(result).toEqual(true);
        });
        it('should recognize that a string doesn\'t contain any lowercase alphabet characters', () => {
            let str = 'NO LOWERCASE';
            let result = stringService.containsAlphaLC(str);
            expect(result).toEqual(false);
        });
    });
}
