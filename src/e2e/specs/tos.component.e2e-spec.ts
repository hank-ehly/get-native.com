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

    it('should display quick-links', () => {
        let linkList = $('.list.list_unordered.list_top');
        expect(linkList.isPresent()).toBe(true);
    });
});
