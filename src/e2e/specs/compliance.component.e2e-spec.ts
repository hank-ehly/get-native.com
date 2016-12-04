/**
 * cookie-compliance.component.e2e-spec
 * get-native.com
 *
 * Created by henryehly on 2016/11/11.
 */

describe('CookieCompliance', () => {
    let dialog = $('.dialog');

    beforeEach(async() => {
        return await browser.get('/');
    });

    it('should disappear upon pressing the close button', () => {
        let closeButton = $('.dialog__link_close');

        expect(dialog.isPresent()).toBe(true);

        closeButton.click();
        browser.driver.sleep(250);

        expect(dialog.isPresent()).toBe(false);
    });
});
