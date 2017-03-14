/**
 * entity-list
 * get-native.com
 *
 * Created by henryehly on 2017/03/14.
 */

const util = require('./utility');

module.exports = {
    wrap(list) {
        let listType = util.typeof(list);
        if (listType !== 'array') {
            throw new TypeError(`Argument must be an array. Received ${listType}`);
        }

        let wrappedList = {
            records: [],
            count: 0
        };

        for (let item of list) {
            let itemType = util.typeof(item);
            if (util.typeof(item) !== 'object') {
                throw new TypeError(`Item must be an object. Received ${itemType}`);
            }

            wrappedList.records.push(item);
            wrappedList.count += 1;
        }

        return wrappedList;
    },

    deepWrap(list, properties) {
        if (arguments.length < 2) {
            throw new Error('No sub-property list provided. Please use \'wrap\' instead.');
        }

        let propertiesType = util.typeof(properties);
        if (propertiesType !== 'array') {
            throw new TypeError(`Sub-property list must be of type 'array'. Received '${propertiesType}'`);
        }

        let wrappedList = this.wrap(list);

        for (let p of properties) {

            for (let i = 0; i < wrappedList.count; i++) {
                let record = wrappedList.records[i];

                if (!record.hasOwnProperty(p)) {
                    throw new ReferenceError(`Record has no own property '${p}'`);
                }

                record[p] = this.wrap(record[p]);
            }
        }

        console.log(wrappedList);

        return wrappedList;
    }
};
