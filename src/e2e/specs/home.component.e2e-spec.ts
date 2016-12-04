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
        expect($('.section_large-features').isPresent()).toBe(true);
    });

    it('should have small features', () => {
        expect($('.section_small-features').isPresent()).toBe(true);
    });

    it('should display the login modal on pressing sign-in/sign-up', () => {
        let socialLogin = $('gn-social-login');

        $('button.headline__button').click();
        expect(socialLogin.isPresent()).toBe(true);

        $('gn-login .overlay').click();
        browser.driver.sleep(250);

        expect(socialLogin.isPresent()).toBe(true);
    });
});
