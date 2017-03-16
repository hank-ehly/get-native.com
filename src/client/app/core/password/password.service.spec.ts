/**
 * password.service.spec
 * get-native.com
 *
 * Created by henryehly on 2016/11/27.
 */

import { PasswordService } from './password.service';
import { STUBLogger } from '../logger/logger.stub';
import { StringService } from '../string/string.service';
import { STUBPasswords } from '../spec/stubs';
import { PasswordBlacklist as Blacklist } from './password-blacklist';

export function main() {
    let passwordStrengthService: PasswordService;

    describe('PasswordService', () => {
        beforeEach(() => {
            passwordStrengthService = new PasswordService(STUBLogger, new StringService());
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
