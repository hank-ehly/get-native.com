/**
 * entity-list.spec
 * get-native.com
 *
 * Created by henryehly on 2017/03/14.
 */

const EntityList = require('../../app/helpers/entity-list');
const assert = require('assert');

describe('entity-list', function() {

    describe('wrap', () => {
        it('should throw a TypeError when provided a single string argument', () => {
            assert.throws(() => EntityList.wrap('This is not a list.'), TypeError);
        });

        it('should throw a TypeError when provided a single integer argument', () => {
            assert.throws(() => EntityList.wrap(123), TypeError);
        });

        it('should throw a TypeError when provided a single object literal argument', () => {
            assert.throws(() => EntityList.wrap({a: 'b'}), TypeError);
        });

        it('should throw a TypeError when provided an array argument containing a top-level string literal', () => {
            assert.throws(() => EntityList.wrap([{a: 'b'}, {c: 'd'}, 'e']), TypeError);
        });

        it('should throw a TypeError when provided an array argument containing a top-level integer', () => {
            assert.throws(() => EntityList.wrap([{a: 'b'}, {c: 'd'}, 5]), TypeError);
        });

        it('should throw a TypeError when provided an array argument containing a top-level array', () => {
            assert.throws(() => EntityList.wrap([{a: 'b'}, {c: 'd'}, [{e: 'f'}]]), TypeError);
        });

        it('should not throw an Error if passed an empty array', () => {
            assert.doesNotThrow(() => EntityList.wrap([]));
        });

        it('should return an object with \'records\' top-level array property', () => {
            let result = EntityList.wrap([{a: 'b'}, {c: 'd'}]);
            assert(typeof result['records'] === 'object');
        });

        it('should return an object with \'count\' top-level integer property', () => {
            let result = EntityList.wrap([{a: 'b'}, {c: 'd'}]);
            assert(new RegExp(/^[0-9]+$/).test(result['count']));
        });

        it('should return an object whose \'records\' property value contains the same value as the argument.', () => {
            let args = [{a: 'b'}, {c: 'd'}];
            let result = EntityList.wrap(args);
            let records = result.records;
            assert.deepEqual(args, records);
        });

        it('should return an object whose \'count\' property value contains the length of the argument array.', () => {
            let args = [{a: 'b'}, {c: 'd'}];
            let result = EntityList.wrap(args);
            let count = result.count;
            assert.equal(count, args.length);
        });
    });

    describe('deepWrap', () => {
        it('should throw a TypeError if a non-array argument is provided as the sub-property list', () => {
            assert.throws(() => EntityList.deepWrap([{foo: {bar: ['baz']}}], false), TypeError);
        });

        it('should throw an Error if no sub-properties are provided', () => {
            assert.throws(() => EntityList.deepWrap([{foo: {bar: ['baz']}}]), Error);
        });

        it('should throw a ReferenceError if the root object does not contain one of the properties listed as a sub-property', () => {
            assert.throws(() => EntityList.deepWrap([{foo: {bar: ['baz']}}], ['jig']), ReferenceError);
        });

        it('should wrap each sub-property', () => {
            let obj = [
                {
                    name: 'Hank',
                    hobbies: [{name: 'Table Tennis'}, {name: 'Programming'}],
                    friends: [{name: 'Pat'}, {name: 'Jackson'}, {name: 'Sean'}]
                }
            ];

            let result = EntityList.deepWrap(obj, ['hobbies', 'friends']);

            assert.deepEqual(obj[0], result.records[0]);
            assert.equal(obj.length, result.count);
        });
    });
});
