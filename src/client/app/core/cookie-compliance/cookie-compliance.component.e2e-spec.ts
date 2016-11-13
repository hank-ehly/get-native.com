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

    it('should display the cookie compliance popup', () => {
        expect(element(by.css('.cookie-compliance-dialog')).isPresent()).toEqual(true);
    });
});
