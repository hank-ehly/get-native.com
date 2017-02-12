/**
 * password.service
 * get-native.com
 *
 * Created by henryehly on 2016/11/23.
 */

import { Injectable } from '@angular/core';

import { StringService, PasswordBlacklist as Blacklist, Logger } from '../index';

@Injectable()
export class PasswordService {
    constructor(private logger: Logger, private stringService: StringService) {
    }

    /* Algorithm taken from http://www.passwordmeter.com */
    calculateStrength(password: string): number {
        if (!password || Blacklist.indexOf(password) !== -1) {
            return 0;
        }

        let nAlphaUC          : number = 0;
        let nAlphaLC          : number = 0;
        let nNumber           : number = 0;
        let nSymbol           : number = 0;
        let nMidChar          : number = 0;
        let nUnqChar          : number = 0;
        let nRepChar          : number = 0;
        let nRepInc           : number = 0;
        let nConsecAlphaUC    : number = 0;
        let nConsecAlphaLC    : number = 0;
        let nConsecNumber     : number = 0;
        let nSeqAlpha         : number = 0;
        let nSeqNumber        : number = 0;
        let nSeqSymbol        : number = 0;
        let nTmpAlphaUC       : number = 0;
        let nTmpAlphaLC       : number = 0;
        let nTmpNumber        : number = 0;

        let nMultMidChar      : number = 2;
        let nMultConsecAlphaUC: number = 2;
        let nMultConsecAlphaLC: number = 2;
        let nMultConsecNumber : number = 2;

        let nMultSeqAlpha     : number = 3;
        let nMultSeqNumber    : number = 3;
        let nMultSeqSymbol    : number = 3;

        let nMultLength       : number = 4;
        let nMultNumber       : number = 4;
        let nMultSymbol       : number = 6;

        let score: number = password.length * nMultLength;
        let passwordChars: string[] = password.replace(/\s+/g, '').split(/\s*/);

        for (let i: number = 0; i < passwordChars.length; i++) {
            const char = passwordChars[i];

            if (this.stringService.containsAlphaUC(char)) {
                if ((nTmpAlphaUC + 1) === i) nConsecAlphaUC++;
                nTmpAlphaUC = i;
                nAlphaUC++;
            } else if (this.stringService.containsAlphaLC(char)) {
                if ((nTmpAlphaLC + 1) === i) nConsecAlphaLC++;
                nTmpAlphaLC = i;
                nAlphaLC++;
            } else if (this.stringService.containsNumeric(char)) {
                if (i > 0 && i < (passwordChars.length - 1)) nMidChar++;
                if ((nTmpNumber + 1) === i) nConsecNumber++;
                nTmpNumber = i;
                nNumber++;
            } else if (this.stringService.containsSymbol(char)) {
                if (i > 0 && i < (passwordChars.length - 1)) nMidChar++;
                nSymbol++;
            }

            let bCharExists: boolean = false;
            for (let j: number = 0; j < passwordChars.length; j++) {
                if (char === passwordChars[j] && i !== j) { /* repeat character exists */
                    bCharExists = true;
                    nRepInc += Math.abs(passwordChars.length / (j - i));
                }
            }

            if (bCharExists) {
                nRepChar++;
                nUnqChar = passwordChars.length - nRepChar;
                nRepInc = (nUnqChar) ? Math.ceil(nRepInc / nUnqChar) : Math.ceil(nRepInc);
            }
        }

        for (let i = 0; i < 23; i++) {
            let sFwd = 'abcdefghijklmnopqrstuvwxyz'.substring(i, i + 3);
            let sRev = this.stringService.reverse(sFwd);
            if (password.toLowerCase().indexOf(sFwd) !== -1 || password.toLowerCase().indexOf(sRev) !== -1) {
                nSeqAlpha++;
            }
        }

        for (let i = 0; i < 8; i++) {
            let sFwd = '01234567890'.substring(i, i + 3);
            let sRev = this.stringService.reverse(sFwd);
            if (password.toLowerCase().indexOf(sFwd) !== -1 || password.toLowerCase().indexOf(sRev) !== -1) {
                nSeqNumber++;
            }
        }

        for (let i = 0; i < 8; i++) {
            let sFwd = ')!@#$%^&*()'.substring(i, i + 3);
            let sRev = this.stringService.reverse(sFwd);
            if (password.toLowerCase().indexOf(sFwd) !== -1 || password.toLowerCase().indexOf(sRev) !== -1) {
                nSeqSymbol++;
            }
        }

        if (nAlphaUC > 0 && nAlphaUC < password.length) score = score + ((password.length - nAlphaUC) * 2);
        if (nAlphaLC > 0 && nAlphaLC < password.length) score = score + ((password.length - nAlphaLC) * 2);
        if (nNumber  > 0 && nNumber  < password.length) score = score + (nNumber * nMultNumber);

        if ((nAlphaLC > 0 || nAlphaUC > 0) && nSymbol === 0 && nNumber === 0) score = score - password.length;
        if (nAlphaLC === 0 && nAlphaUC === 0 && nSymbol === 0 && nNumber > 0) score = score - password.length;

        if (nRepChar       > 0) score = score - nRepInc;
        if (nSymbol        > 0) score = score + (nSymbol        * nMultSymbol);
        if (nMidChar       > 0) score = score + (nMidChar       * nMultMidChar);
        if (nConsecAlphaUC > 0) score = score - (nConsecAlphaUC * nMultConsecAlphaUC);
        if (nConsecAlphaLC > 0) score = score - (nConsecAlphaLC * nMultConsecAlphaLC);
        if (nConsecNumber  > 0) score = score - (nConsecNumber  * nMultConsecNumber);
        if (nSeqAlpha      > 0) score = score - (nSeqAlpha      * nMultSeqAlpha);
        if (nSeqNumber     > 0) score = score - (nSeqNumber     * nMultSeqNumber);
        if (nSeqSymbol     > 0) score = score - (nSeqSymbol     * nMultSeqSymbol);

        if (score > 100) score = 100; else if (score < 0) score = 0;

        this.logger.debug(this, `Password Strength: ${score}`);
        return score;
    }

}
