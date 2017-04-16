/**
 * email.spec
 * get-native.com
 *
 * Created by henryehly on 2017/04/17.
 */

const assert = require('assert');
const Email = require('../../app/helpers').Email;
const k = require('../../config/keys.json');
const SpecUtil = require('../spec-util');
const _ = require('lodash');

describe('Email', function() {
    let server  = null;
    let maildev = null;

    before(function() {
        this.timeout(SpecUtil.defaultTimeout);
        return Promise.all([SpecUtil.seedAll(), SpecUtil.startMailServer()]);
    });

    beforeEach(function() {
        this.timeout(SpecUtil.defaultTimeout);
        return SpecUtil.startServer().then(initItems => {
            server  = initItems.server;
            maildev = initItems.maildev;
        });
    });

    afterEach(function(done) {
        return server.close(done);
    });

    after(function() {
        this.timeout(SpecUtil.defaultTimeout);
        return Promise.all([SpecUtil.seedAllUndo(), SpecUtil.stopMailServer()]);
    });

    describe('send', function() {
        it(`should throw a ReferenceError if no template key is provided`, function() {
            assert.throws(function() {
                Email.send()
            }, ReferenceError);
        });

        it(`should throw a ReferenceError if no mailer options are provided`, function() {
            assert.throws(function() {
                Email.send('key')
            }, ReferenceError);
        });

        it(`should throw a TypeError if the template key is not a string`, function() {
            assert.throws(function() {
                Email.send(10, {foo: 'bar'})
            }, TypeError);
        });

        it(`should throw a TypeError if the mailer options is not a plain object`, function() {
            assert.throws(function() {
                Email.send('key', 'not a plain object')
            }, TypeError);
        });

        it(`should send an email`, function() {
            return Email.send(k.Email.Welcome, {
                from:    'sender@email.com',
                to:      'receiver@email.com',
                subject: 'subject'
            }).then(function() {
                return SpecUtil.getAllEmail().then(function(emails) {
                    assert(_.gt(emails.length, 0));
                });
            });
        });

        it(`should send an email from the specified sender`, function() {
            let sender = 'sender@email.com';
            return Email.send(k.Email.Welcome, {
                from:    sender,
                to:      'receiver@email.com',
                subject: 'subject'
            }).then(function() {
                return SpecUtil.getAllEmail().then(function(emails) {
                    assert.equal(_.last(emails).envelope.from.address, sender);
                });
            });
        });

        it(`should send an email to the specified receiver`, function() {
            let receiver = 'receiver@email.com';
            return Email.send(k.Email.Welcome, {
                from:    'sender@email.com',
                to:      receiver,
                subject: 'subject'
            }).then(function() {
                return SpecUtil.getAllEmail().then(function(emails) {
                    assert.equal(_.first(_.last(emails).envelope.to).address, receiver);
                });
            });
        });

        it(`should send an email with the specified subject`, function() {
            let subject = 'Hello World!';
            return Email.send(k.Email.Welcome, {
                from:    'sender@email.com',
                to:      'receiver@email.com',
                subject: subject
            }).then(function() {
                return SpecUtil.getAllEmail().then(function(emails) {
                    assert.equal(_.last(emails).subject, subject);
                });
            });
        });

        it(`should send an email with the specified template`, function() {
            return Email.send(k.Email.Welcome, {
                from:    'sender@email.com',
                to:      'receiver@email.com',
                subject: 'subject'
            }).then(function() {
                return SpecUtil.getAllEmail().then(function(emails) {
                    assert(_.includes(_.last(emails).html, 'Welcome to Get Native!'));
                });
            });
        });

        it(`should send different emails when different template keys are provided`, function() {
            const options = {to: 'receiver@email.com'};
            return Promise.all([Email.send(k.Email.Welcome, options), Email.send(k.Email.ResetPassword, options)]).then(function() {
                return SpecUtil.getAllEmail().then(function(emails) {
                    assert.notEqual(_.nth(emails, -1).html, _.nth(emails, -2).html);
                });
            });
        });
    });
});
