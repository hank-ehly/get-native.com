/**
 * string.service.spec
 * get-native.com
 *
 * Created by henryehly on 2016/11/27.
 */

import { StringService } from './string.service';

describe('StringService', () => {
    let stringService: StringService;

    beforeAll(() => {
        stringService = new StringService();
    });

    it('should recognize that a string contains a symbol', () => {
        const result = stringService.containsSymbol('(Parentheses)');
        expect(result).toEqual(true);
    });

    it('should recognize that a string doesn\'t contain a symbol', () => {
        const result = stringService.containsSymbol('No_symbol');
        expect(result).toEqual(false);
    });

    it('should recognize that a string contains a number', () => {
        const result = stringService.containsNumeric('Hell0');
        expect(result).toEqual(true);
    });

    it('should recognize that a string doesn\'t contain a number', () => {
        const result = stringService.containsNumeric('No number');
        expect(result).toEqual(false);
    });

    it('should recognize that a string contains at least one uppercase alphabet character', () => {
        const result = stringService.containsAlphaUC('One uppercase');
        expect(result).toEqual(true);
    });

    it('should recognize that a string doesn\'t contain any uppercase alphabet characters', () => {
        const result = stringService.containsAlphaUC('all lowercase');
        expect(result).toEqual(false);
    });

    it('should recognize that a string contains at least one lowercase alphabet character', () => {
        const result = stringService.containsAlphaLC('HELLO world');
        expect(result).toEqual(true);
    });

    it('should recognize that a string doesn\'t contain any lowercase alphabet characters', () => {
        const result = stringService.containsAlphaLC('NO LOWERCASE');
        expect(result).toEqual(false);
    });
});
