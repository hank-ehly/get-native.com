/**
 * home.component.e2e-spec
 * get-native.com
 *
 * Created by henryehly on 2016/11/08.
 */

describe('Home', () => {
    beforeEach( () => {
        browser.get('/');
    });

    it('should have large features', () => {
        expect(element(by.css('.main-features')).isPresent()).toBe(true);
    });

    it('should have small features', () => {
        expect(element(by.css('.secondary-features')).isPresent()).toBe(true);
    });
});
