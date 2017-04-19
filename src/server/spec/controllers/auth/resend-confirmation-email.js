/**
 * resend-confirmation-email
 * get-native.com
 *
 * Created by henryehly on 2017/04/19.
 */

describe('POST /resend_confirmation_email', function() {
    describe('response.failure', function() {
        it(`should respond with 400 Bad Request if the 'email' body parameter is missing`);
        it(`should respond with 400 Bad Request if the 'email' body parameter is not a string`);
        it(`should respond with 400 Bad Request if the 'email' body parameter is not a valid email address`);
        it(`should respond with 404 Not Found if no account with the specified email address exists`);
        it(`should contains the appropriate error response object if the account does not exist`);
        it(`should respond with 422 Unprocessable Entity if the account linked to the specified email address is already confirmed`);
        it(`should contains the appropriate error response object if the account is already confirmed`);
    });

    describe('response.success', function() {
        it(`should respond with 204 No Content if the request succeeds`);
    });

    describe('other', function() {
        it(`should create a new VerificationToken linked to the account`);
        it(`should send an email to the specified address if it is linked to an account`);
        it(`should send an email containing the confirmation URL (with the correct VerificationToken token)`);
    });
});
