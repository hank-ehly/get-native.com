/**
 * password.service
 * getnativelearning.com
 *
 * Created by henryehly on 2016/11/23.
 */

import { Injectable } from '@angular/core';

import { PasswordBlacklist as Blacklist } from './password-blacklist';
import { StringService } from '../string/string.service';
import { Logger } from '../logger/logger';

import * as _ from 'lodash';

@Injectable()
export class PasswordService {

    constructor(private logger: Logger, private stringService: StringService) {
    }

    /* Algorithm taken from http://www.passwordmeter.com */
    calculateStrength(password: string): number {
        if (!password || _.includes(Blacklist, password)) {
            return 0;
        }

        let nAlphaUC       = 0;
        let nAlphaLC       = 0;
        let nNumber        = 0;
        let nSymbol        = 0;
        let nMidChar       = 0;
        let nUnqChar       = 0;
        let nRepChar       = 0;
        let nRepInc        = 0;
        let nConsecAlphaUC = 0;
        let nConsecAlphaLC = 0;
        let nConsecNumber  = 0;
        let nSeqAlpha      = 0;
        let nSeqNumber     = 0;
        let nSeqSymbol     = 0;
        let nTmpAlphaUC    = 0;
        let nTmpAlphaLC    = 0;
        let nTmpNumber     = 0;

        const nMultMidChar       = 2;
        const nMultConsecAlphaUC = 2;
        const nMultConsecAlphaLC = 2;
        const nMultConsecNumber  = 2;

        const nMultSeqAlpha      = 3;
        const nMultSeqNumber     = 3;
        const nMultSeqSymbol     = 3;

        const nMultLength        = 4;
        const nMultNumber        = 4;
        const nMultSymbol        = 6;

        let score: number = password.length * nMultLength;
        const passwordChars: string[] = _.split(_.replace(password, /\s+/g, ''), /\s*/);
        const passwordCharsLength = passwordChars.length;

        for (let i = 0; i < passwordCharsLength; i++) {
            const char = _.nth(passwordChars, i);

            if (this.stringService.containsAlphaUC(char)) {
                if ((nTmpAlphaUC + 1) === i) {
                    nConsecAlphaUC++;
                }
                nTmpAlphaUC = i;
                nAlphaUC++;
            } else if (this.stringService.containsAlphaLC(char)) {
                if ((nTmpAlphaLC + 1) === i) {
                    nConsecAlphaLC++;
                }
                nTmpAlphaLC = i;
                nAlphaLC++;
            } else if (this.stringService.containsNumeric(char)) {
                if (i > 0 && i < (passwordCharsLength - 1)) {
                    nMidChar++;
                }
                if ((nTmpNumber + 1) === i) {
                    nConsecNumber++;
                }
                nTmpNumber = i;
                nNumber++;
            } else if (this.stringService.containsSymbol(char)) {
                if (i > 0 && i < (passwordCharsLength - 1)) {
                    nMidChar++;
                }
                nSymbol++;
            }

            let bCharExists = false;
            for (let j = 0; j < passwordCharsLength; j++) {
                if (char === passwordChars[j] && i !== j) { /* repeat character exists */
                    bCharExists = true;
                    nRepInc += Math.abs(passwordCharsLength / (j - i));
                }
            }

            if (bCharExists) {
                nRepChar++;
                nUnqChar = passwordCharsLength - nRepChar;
                nRepInc = (nUnqChar) ? _.ceil(nRepInc / nUnqChar) : _.ceil(nRepInc);
            }
        }

        for (let i = 0; i < 23; i++) {
            const sFwd = 'abcdefghijklmnopqrstuvwxyz'.substring(i, i + 3);
            const sRev = _.join(_.reverse(_.split(sFwd, '')));
            if (_.includes(_.toLower(password), sFwd) || _.includes(_.toLower(password), sRev)) {
                nSeqAlpha++;
            }
        }

        for (let i = 0; i < 8; i++) {
            const sFwd = '01234567890'.substring(i, i + 3);
            const sRev = _.join(_.reverse(_.split(sFwd, '')));
            if (_.includes(_.toLower(password), sFwd) || _.includes(_.toLower(password), sRev)) {
                nSeqNumber++;
            }
        }

        for (let i = 0; i < 8; i++) {
            const sFwd = ')!@#$%^&*()'.substring(i, i + 3);
            const sRev = _.join(_.reverse(_.split(sFwd, '')));
            if (_.includes(_.toLower(password), sFwd) || _.includes(_.toLower(password), sRev)) {
                nSeqSymbol++;
            }
        }

        if (nAlphaUC > 0 && nAlphaUC < password.length) {
            score = score + ((password.length - nAlphaUC) * 2);
        }

        if (nAlphaLC > 0 && nAlphaLC < password.length) {
            score = score + ((password.length - nAlphaLC) * 2);
        }

        if (nNumber > 0 && nNumber < password.length) {
            score = score + (nNumber * nMultNumber);
        }

        if ((nAlphaLC > 0 || nAlphaUC > 0) && nSymbol === 0 && nNumber === 0) {
            score = score - password.length;
        }

        if (nAlphaLC === 0 && nAlphaUC === 0 && nSymbol === 0 && nNumber > 0) {
            score = score - password.length;
        }

        if (nRepChar > 0) {
            score = score - nRepInc;
        }

        if (nSymbol > 0) {
            score = score + (nSymbol * nMultSymbol);
        }

        if (nMidChar > 0) {
            score = score + (nMidChar * nMultMidChar);
        }

        if (nConsecAlphaUC > 0) {
            score = score - (nConsecAlphaUC * nMultConsecAlphaUC);
        }

        if (nConsecAlphaLC > 0) {
            score = score - (nConsecAlphaLC * nMultConsecAlphaLC);
        }

        if (nConsecNumber > 0) {
            score = score - (nConsecNumber * nMultConsecNumber);
        }

        if (nSeqAlpha > 0) {
            score = score - (nSeqAlpha * nMultSeqAlpha);
        }

        if (nSeqNumber > 0) {
            score = score - (nSeqNumber * nMultSeqNumber);
        }

        if (nSeqSymbol > 0) {
            score = score - (nSeqSymbol * nMultSeqSymbol);
        }

        if (score > 100) {
            score = 100;
        } else if (score < 0) {
            score = 0;
        }

        this.logger.debug(this, `Password Strength: ${score}`);
        return score;
    }

}
