/**
 * help.component.e2e-spec
 * get-native.com
 *
 * Created by henryehly on 2016/11/08.
 */

describe('Help', () => {
    beforeEach(async() => {
        return await browser.get('/help');
    });

    it('should have visible faq headings', () => {
        let list = element.all(by.css('.about .section-body li .item-head'));
        expect(list.count()).toBeGreaterThan(0);
    });

    it('all faqs should be collapsed', () => {
        let list = $$('.about .section-body li .item-detail');
        expect(list.count()).toBe(0);
    });

    it('should display a faq when selected', () => {
        let itemLabels = $$('.about .section-body li .item-label');
        let itemDetails = $$('.about .section-body li .item-detail');
        //noinspection TypeScriptUnresolvedFunction
        itemLabels.first().click();
        expect(itemDetails.count()).toBe(1);
    });
});
