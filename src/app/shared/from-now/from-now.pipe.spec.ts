import { FromNowPipe } from './from-now.pipe';

describe('FromNowPipe', () => {
    it('creates an instance', () => {
        const pipe = new FromNowPipe();
        expect(pipe).toBeTruthy();
    });
});
