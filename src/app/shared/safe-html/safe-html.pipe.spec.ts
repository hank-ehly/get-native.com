import { SafeHtmlPipe } from './safe-html.pipe';

describe('SafeHtmlPipe', () => {
    it('create an instance', () => {
        const pipe = new SafeHtmlPipe();
        return expect(pipe).toBeTruthy();
    });
});
