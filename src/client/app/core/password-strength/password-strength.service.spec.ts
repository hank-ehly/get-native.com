/**
 * password-strength.service.spec
 * get-native.com
 *
 * Created by henryehly on 2016/11/27.
 */

import { STUBLogger, STUBPasswords, StringService, PasswordStrengthService, PasswordBlacklist as Blacklist } from '../index';

export function main() {
    let passwordStrengthService: PasswordStrengthService;

    describe('PasswordStrengthService', () => {
        beforeEach(() => {
            passwordStrengthService = new PasswordStrengthService(STUBLogger, new StringService());
        });

        it('should recognize a VERY WEAK password', () => {
            let password = STUBPasswords.veryWeak;
            let score = passwordStrengthService.calculateStrength(password);
            expect(score).toBeLessThan(20);
        });

        it('should recognize a WEAK password', () => {
            let password = STUBPasswords.weak;
            let score = passwordStrengthService.calculateStrength(password);
            expect(score).toBeGreaterThanOrEqual(20);
            expect(score).toBeLessThan(40);
        });

        it('should recognize a GOOD password', () => {
            let password = STUBPasswords.good;
            let score = passwordStrengthService.calculateStrength(password);
            expect(score).toBeGreaterThanOrEqual(40);
            expect(score).toBeLessThan(60);
        });

        it('should recognize a STRONG password', () => {
            let password = STUBPasswords.strong;
            let score = passwordStrengthService.calculateStrength(password);
            expect(score).toBeGreaterThanOrEqual(60);
            expect(score).toBeLessThan(80);
        });

        it('should recognize a VERY STRONG password', () => {
            let password = STUBPasswords.veryStrong;
            let score = passwordStrengthService.calculateStrength(password);
            expect(score).toBeGreaterThanOrEqual(80);
            expect(score).toBeLessThan(100);
        });

        it('should recognize passwords in the blacklist as VERY WEAK', () => {
            let password = Blacklist[0];
            let score = passwordStrengthService.calculateStrength(password);
            expect(score).toEqual(0);
        });
    });
}
