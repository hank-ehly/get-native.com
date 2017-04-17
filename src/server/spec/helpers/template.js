/**
 * template
 * get-native.com
 *
 * Created by henryehly on 2017/04/17.
 */

const assert = require('assert');
const Template = require('../../app/helpers').Template;
const _ = require('lodash');

describe('Template', function() {
    describe('create', function() {
        it(`should throw a ReferenceError if the template path is missing`, function() {
            assert.throws(function() {
                Template.create();
            }, ReferenceError);
        });

        it(`should throw a TypeError if the template path is not a string`, function() {
            assert.throws(function() {
                Template.create(['hello', 'world']);
            }, TypeError);
        });

        it(`should throw a ReferenceError if the template path does not exist or is not accessible`, function() {
            Template.create('not/a/template').then(assert.fail).catch(e => {
                assert(e instanceof ReferenceError);
            });
        });

        it(`should throw a TypeError if the provided locale is not a string`, function() {
            assert.throws(function() {
                Template.create('welcome', {locale: ['en'], variables: {confirmationURL: 'https://hankehly.com'}});
            }, TypeError);
        });

        it(`should throw a TypeError if options.variables is not a plain object`, function() {
            assert.throws(function() {
                Template.create('welcome', {variables: ['not', 'a', 'plain', 'object']});
            }, TypeError);
        });

        it(`should return a promise that resolves to a template string`, function() {
            return Template.create('welcome', {variables: {confirmationURL: 'https://hankehly.com'}}).then(function(template) {
                assert(_.isString(template));
            });
        });

        it(`should resolve template variables using the English locale if none is specified`, function() {
            return Template.create('welcome', {variables: {confirmationURL: 'https://hankehly.com'}}).then(function(template) {
                assert(_.includes(template, 'Welcome'));
            });
        });

        it(`should resolve template variables using the provided locale if it matches an available locale`, function() {
            return Template.create('welcome', {locale: 'ja', variables: {confirmationURL: 'https://hankehly.com'}}).then(function(template) {
                assert(_.includes(template, 'ようこそ'));
            });
        });

        it(`should resolve template variables using the English locale if the provided locale does not match an available locale`, function() {
            return Template.create('welcome', {locale: 'ko', variables: {confirmationURL: 'https://hankehly.com'}}).then(function(template) {
                assert(_.includes(template, 'Welcome to Get Native!'));
            });
        });

        it(`should overwrite default variables if overlapping variable name is found in options.variables`, function() {
            let originalTitle = require('../../config/locales/templates/welcome/en.json').title;
            let overwrittenTitle = '__OVERWRITE__';
            return Template.create('welcome', {
                locale: 'en',
                variables: {
                    confirmationURL: 'https://hankehly.com',
                    title: overwrittenTitle
                }
            }).then(function(template) {
                assert(_.includes(template, overwrittenTitle));
                assert(!_.includes(template, originalTitle));
            });
        });

        it(`should throw a ReferenceError if a variable is unresolvable`, function() {
            // The 'welcome' template requires an explicitly specified 'confirmationURL' variable
            Template.create('welcome', {variables: {}}).then(assert.fail).catch(e => {
                assert(e instanceof ReferenceError);
            });
        });
    });
});
