/**
 * home.component.e2e-spec
 * get-native.com
 *
 * Created by henryehly on 2016/11/08.
 */

describe('Home', () => {
    beforeEach(async() => {
        return await browser.get('/');
    });

    it('should have large features', () => {
        expect($('.large-features').isPresent()).toBe(true);
    });

    it('should have small features', () => {
        expect($('.small-features').isPresent()).toBe(true);
    });
});
