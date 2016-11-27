/**
 * login.component.e2e-spec
 * get-native.com
 *
 * Created by henryehly on 2016/11/13.
 */

describe('LoginComponent', () => {
    beforeEach(async() => {
        return await browser.get('/');
    });

    it('should display an overlay', () => {
        let openBtn = $('.sign-in');
        let overlay = $('.overlay');

        //noinspection TypeScriptUnresolvedFunction
        openBtn.click();

        expect(overlay.isPresent()).toBe(true);
    });

    it('should display the login modal', () => {
        let openBtn = $('.sign-in');
        let modal = $('.modal-window');

        //noinspection TypeScriptUnresolvedFunction
        openBtn.click();

        expect(modal.isPresent()).toBe(true);
    });

    it ('should close the login modal after clicking the overlay', () => {
        let openBtn = $('.sign-in');
        let overlay = $('.overlay');
        let modalWrapper = $('.modal-window');

        //noinspection TypeScriptUnresolvedFunction
        openBtn.click();

        //noinspection TypeScriptUnresolvedFunction
        browser.actions().mouseMove(overlay, 1, 0).click().perform();

        //noinspection TypeScriptUnresolvedFunction
        browser.driver.sleep(250);

        expect(modalWrapper.isPresent()).toBe(false);
    });

    it ('should close the login modal after clicking the close button', () => {
        let openBtn = $('.sign-in');
        let closeBtn = $('.close-button');
        let modal = $('.modal-window');

        //noinspection TypeScriptUnresolvedFunction
        openBtn.click();

        //noinspection TypeScriptUnresolvedFunction
        closeBtn.click();

        //noinspection TypeScriptUnresolvedFunction
        browser.driver.sleep(250);

        expect(modal.isPresent()).toBe(false);
    });

    it('should transition to and from the email login modal view', () => {
        let openBtn = $('.sign-in');
        let emailBtn = $('.modal-social footer .footer-link:nth-child(1)');
        let socialBtn = $('.modal-email footer .footer-link:nth-child(1)');
        let socialView = $('.modal-social');
        let emailView = $('.modal-email');

        //noinspection TypeScriptUnresolvedFunction
        openBtn.click();

        expect(emailView.isPresent()).toBe(false);

        //noinspection TypeScriptUnresolvedFunction
        emailBtn.click();

        expect(emailView.isPresent()).toBe(true);
        expect(socialView.isPresent()).toBe(false);

        //noinspection TypeScriptUnresolvedFunction
        socialBtn.click();

        expect(socialView.isPresent()).toBe(true);
    });

    it('should transition to and from the registration modal view', () => {
        let openBtn = $('.sign-in');
        let registerBtn = $('.modal-social footer .footer-link:nth-child(2)');
        let socialBtn = $('.modal-register footer .footer-link:nth-child(1)');
        let registerView = $('.modal-register');
        let socialView = $('.modal-social');

        //noinspection TypeScriptUnresolvedFunction
        openBtn.click();

        expect(registerView.isPresent()).toBe(false);

        //noinspection TypeScriptUnresolvedFunction
        registerBtn.click();

        expect(registerView.isPresent()).toBe(true);
        expect(socialView.isPresent()).toBe(false);

        //noinspection TypeScriptUnresolvedFunction
        socialBtn.click();

        expect(socialView.isPresent()).toBe(true);
    });

    it('should not allow registration until all form fields are filled in', () => {
        let openBtn = $('.sign-in');
        let registerBtn = $('.modal-social footer .footer-link:nth-child(2)');
        let emailInput = $('#email');
        let passwordInput = $('#password');
        let submitButton = element(by.buttonText('SIGN UP'));
        let passwordConfirmInput = $('#password-confirm');


        openBtn.click();

        //noinspection TypeScriptUnresolvedFunction
        registerBtn.click();

        //noinspection TypeScriptUnresolvedFunction
        emailInput.sendKeys('foo@bar');

        //noinspection TypeScriptUnresolvedFunction
        passwordInput.sendKeys('password12345');

        //noinspection TypeScriptUnresolvedVariable
        expect(submitButton.getAttribute('disabled')).toBeTruthy();

        //noinspection TypeScriptUnresolvedFunction
        passwordConfirmInput.sendKeys('password12345');

        //noinspection TypeScriptUnresolvedVariable
        expect(submitButton.getAttribute('disabled')).toBeFalsy();
    });
});
