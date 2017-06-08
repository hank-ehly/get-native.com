import { browser } from 'protractor';

export class GetNativeComPage {
    async navigateTo() {
        return await browser.get('/');
    }
}
