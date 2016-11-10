/**
 * privacy.component.e2e-spec
 * get-native.com
 *
 * Created by henryehly on 2016/11/07.
 */

describe('Privacy', () => {

    beforeEach(() => {
        browser.get('/privacy');
    });

    it('should have quick links', () => {
        expect(element(by.css('.quick-links')).isPresent()).toEqual(true);
    });

    it('should have the get native privacy policy heading', () => {
        expect(element(by.css('#introduction')).isPresent()).toEqual(true);
    });

    it('should have the moderator email', () => {
        //noinspection TypeScriptUnresolvedFunction
        expect(element(by.tagName('address')).getText()).toContain('getnative.moderator@gmail.com');
    });
});
