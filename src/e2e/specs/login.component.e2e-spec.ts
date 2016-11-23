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
        let openButton = $('.sign-in');
        let overlay = $('.overlay');
        //noinspection TypeScriptUnresolvedFunction
        openButton.click();
        expect(overlay.isPresent()).toBe(true);
    });

    it('should display the login modal', () => {
        let openButton = $('.sign-in');
        let modalWrapper = $('.modal-window');
        //noinspection TypeScriptUnresolvedFunction
        openButton.click();
        expect(modalWrapper.isPresent()).toBe(true);
    });

    it ('should close the login modal after clicking the overlay', () => {
        let openButton = $('.sign-in');
        let overlay = $('.overlay');
        let modalWrapper = $('.modal-window');
        //noinspection TypeScriptUnresolvedFunction
        openButton.click();
        //noinspection TypeScriptUnresolvedFunction
        browser.actions().mouseMove(overlay, 1, 0).click().perform();
        //noinspection TypeScriptUnresolvedFunction
        browser.driver.sleep(250);
        expect(modalWrapper.isPresent()).toBe(false);
    });

    it ('should close the login modal after clicking the close button', () => {
        let openButton = $('.sign-in');
        let closeButton = $('.close-button');
        let modalWrapper = $('.modal-window');
        //noinspection TypeScriptUnresolvedFunction
        openButton.click();
        //noinspection TypeScriptUnresolvedFunction
        closeButton.click();
        //noinspection TypeScriptUnresolvedFunction
        browser.driver.sleep(250);
        expect(modalWrapper.isPresent()).toBe(false);
    });
});
