/**
 * privacy.component.e2e-spec
 * get-native.com
 *
 * Created by henryehly on 2016/11/07.
 */

describe('Privacy', () => {
    beforeEach(async() => {
        return await browser.get('/privacy');
    });

    it('should display quick-links', () => {
        let linkList = $('.list.list_unordered.list_top');
        expect(linkList.isPresent()).toBe(true);
    });
});
