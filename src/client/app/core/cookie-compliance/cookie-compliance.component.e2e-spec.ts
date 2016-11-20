/**
 * cookie-compliance.component.e2e-spec
 * get-native.com
 *
 * Created by henryehly on 2016/11/11.
 */

describe('CookieCompliance', () => {
    beforeEach(() => {
        browser.get('/');
    });

    it('should be able to close the popup by pressing a button', () => {
        let dialog = $('.cookie-compliance-dialog');
        expect(dialog.isPresent()).toBe(true);

        //noinspection TypeScriptUnresolvedFunction
        dialog.$('.comply-trigger').click();

        // TODO: Disabling animations is preferable to sleep()
        //noinspection TypeScriptUnresolvedFunction
        browser.driver.sleep(250);

        expect(dialog.isPresent()).toBe(false);
    });
});
