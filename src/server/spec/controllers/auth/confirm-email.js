/**
 * confirm-email
 * get-native.com
 *
 * Created by henryehly on 2017/04/18.
 */

describe('POST /confirm_email', function() {
    it(`should respond with 400 Bad Request if the 'token' query parameter is missing`);
});

/*
 * When you register, your account gets created automatically.
 * An account activation record is created and is linked to the user.
 * A confirmation url is generated and it has the account activation code.
 * A confirmation email is sent to you with the confirmation link.
 *
 * When the user clicks the link, it opens the new route 'confirm email'
 * Finds the account activation record
 * Checks the expiry date
 * Changes the user email verified to true
 * Redirects user to /dashboard
 * */

/*
 * Create an account - auth controller
 * Create the code for the activation record - auth helper
 * Create an account activation record - auth controller
 * Generate a confirmation URL - auth helper
 * Send email - auth controller
 *
 * click activation code - new route controller
 * verify account activation code - new route controller
 * log the user in - new route controller
 * */
