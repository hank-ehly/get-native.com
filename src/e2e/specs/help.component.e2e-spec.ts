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

    it('should have visible faq headers', () => {
        let nFaqHeaders = $$('.faq-list__faq-header').count();
        expect(nFaqHeaders).toBeGreaterThan(0);
    });

    it('all faqs should be collapsed', () => {
        let nExpandedFaqs = $$('.faq-list__faq-detail').count();
        expect(nExpandedFaqs).toBe(0);
    });

    it('should display a faq detail when a faq header is selected', () => {
        $$('.faq-list__faq-title').first().click();

        let nExpandedFaqs = $$('.faq-list__faq-detail').count();
        expect(nExpandedFaqs).toBe(1);
    });
});
