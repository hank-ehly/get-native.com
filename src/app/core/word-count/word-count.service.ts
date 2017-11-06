/**
 * word-count.service
 * getnativelearning.com
 *
 * Created by henryehly on 2017/05/04.
 */

import { Injectable } from '@angular/core';

import { LanguageCode } from '../typings/language-code';

import * as _ from 'lodash';

@Injectable()
export class WordCountService {

    count(input: string, languageCode: LanguageCode = 'en'): number {
        let count: number;
        switch (languageCode) {
            case 'ja':
                count = this.countWordsInJapanese(input);
                break;
            default:
                count = this.countWordsInEnglish(input);
                break;
        }
        return count;
    }

    private countWordsInEnglish(input: string): number {
        input = _.replace(input, /[^a-z\s]/gi, '');
        return _.words(_.deburr(input), /[a-z]+/gi).length;
    }

    private countWordsInJapanese(input: string): number {
        return _.words(input, /[\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf]/g).length;
    }

}
