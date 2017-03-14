/**
 * utility
 * get-native.com
 *
 * Created by henryehly on 2017/03/14.
 */

const util = require('../../app/helpers')['utility'];
const assert = require('assert');

describe('utility', () => {
    it('should return \'string\' if passed a string', () => {
        assert.equal(util.typeof('hello world'), 'string');
    });

    it('should return \'boolean\' if passed a boolean', () => {
        assert.equal(util.typeof(false), 'boolean');
    });

    it('should return \'array\' if passed a array', () => {
        assert.equal(util.typeof([1, 2, 3]), 'array');
    });

    it('should return \'object\' if passed a object', () => {
        assert.equal(util.typeof({foo: 'bar'}), 'object');
    });

    it('should return \'number\' if passed a number', () => {
        assert.equal(util.typeof(90), 'number');
    });

    it('should return \'function\' if passed a function', () => {
        assert.equal(util.typeof(function() {}), 'function');
    });
});
