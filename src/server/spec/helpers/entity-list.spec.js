/**
 * entity-list.spec
 * get-native.com
 *
 * Created by henryehly on 2017/03/14.
 */

const EntityList = require('../../app/helpers/entity-list');

describe('entity-list', function() {
    it('should reject single string arguments');
    it('should reject single integer arguments');
    it('should reject array arguments containing top-level strings');
    it('should reject array arguments containing top-level integers');
    it('should reject array arguments containing top-level arrays');
    it('should return an object with \'records\' and \'count\' top-level properties');
    it('should return an object whose \'records\' property value contains the same value as the argument.');
    it('should return an object whose \'count\' property value contains the length of the argument array.');
});
