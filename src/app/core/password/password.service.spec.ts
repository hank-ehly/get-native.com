/**
 * password.service.spec
 * getnativelearning.com
 *
 * Created by henryehly on 2016/11/27.
 */

import { PasswordService } from './password.service';
import { STUBLogger } from '../logger/logger.stub';
import { StringService } from '../string/string.service';
import { STUBPasswords } from '../spec/stubs';
import { PasswordBlacklist as Blacklist } from './password-blacklist';

describe('PasswordService', () => {
    let passwordStrengthService: PasswordService;

    beforeEach(() => {
        passwordStrengthService = new PasswordService(STUBLogger, new StringService());
    });

    it('should recognize a VERY WEAK password', () => {
        const score = passwordStrengthService.calculateStrength(STUBPasswords.veryWeak);
        expect(score).toBeLessThan(20);
    });

    it('should recognize a WEAK password', () => {
        const score = passwordStrengthService.calculateStrength(STUBPasswords.weak);
        expect(score).toBeGreaterThanOrEqual(20);
        expect(score).toBeLessThan(40);
    });

    it('should recognize a GOOD password', () => {
        const score = passwordStrengthService.calculateStrength(STUBPasswords.good);
        expect(score).toBeGreaterThanOrEqual(40);
        expect(score).toBeLessThan(60);
    });

    it('should recognize a STRONG password', () => {
        const score = passwordStrengthService.calculateStrength(STUBPasswords.strong);
        expect(score).toBeGreaterThanOrEqual(60);
        expect(score).toBeLessThan(80);
    });

    it('should recognize a VERY STRONG password', () => {
        const score = passwordStrengthService.calculateStrength(STUBPasswords.veryStrong);
        expect(score).toBeGreaterThanOrEqual(80);
        expect(score).toBeLessThan(100);
    });

    it('should recognize passwords in the blacklist as VERY WEAK', () => {
        const score = passwordStrengthService.calculateStrength(Blacklist[0]);
        expect(score).toEqual(0);
    });
});
