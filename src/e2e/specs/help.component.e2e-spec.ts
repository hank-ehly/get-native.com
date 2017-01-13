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
        let nFaqHeaders = $$('.faqs__faq-header').count();
        expect(nFaqHeaders).toBeGreaterThan(0);
    });

    it('all faqs should be collapsed', () => {
        let nExpandedFaqs = $$('.faqs__faq-detail').count();
        expect(nExpandedFaqs).toBe(0);
    });
});
