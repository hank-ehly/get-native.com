/**
 * tos.component.e2e-spec
 * get-native.com
 *
 * Created by henryehly on 2016/11/10.
 */

describe('TOS', () => {
    beforeEach(async() => {
        return await browser.get('/tos');
    });

    it('should have quick links', () => {
        expect($('.quick-links').isPresent()).toEqual(true);
    });

    it('should have the get native privacy policy heading', () => {
        expect($('#introduction').isPresent()).toEqual(true);
    });

    it('should have the moderator email', () => {
        expect($('.mail').getText()).toContain('getnative.moderator@gmail.com');
    });
});
