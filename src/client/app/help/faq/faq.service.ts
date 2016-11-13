/**
 * faq.service
 * get-native.com
 *
 * Created by henryehly on 2016/11/13.
 */

import { Injectable } from '@angular/core';
import { Faq } from './index';

@Injectable()
export class FaqService {
    getFaqs(): Faq[] {
        return [
            {
                title: 'First FAQ',
                body: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, alias consequatur cupiditate, 
                dolores eos esse ex in inventore ipsam laudantium odio odit possimus provident quod tenetur voluptates 
                voluptatibus? Cupiditate, est? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, alias 
                consequatur cupiditate, dolores eos esse ex in inventore ipsam laudantium odio odit possimus provident 
                quod tenetur voluptates voluptatibus? Cupiditate, est?`
            },
            {
                title: 'Second FAQ',
                body: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, alias consequatur cupiditate, 
                dolores eos esse ex in inventore ipsam laudantium odio odit possimus provident quod tenetur voluptates 
                voluptatibus? Cupiditate, est? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, alias 
                consequatur cupiditate, dolores eos esse ex in inventore ipsam laudantium odio odit possimus provident 
                quod tenetur voluptates voluptatibus? Cupiditate, est?`
            },
            {
                title: 'Third FAQ',
                body: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, alias consequatur cupiditate, 
                dolores eos esse ex in inventore ipsam laudantium odio odit possimus provident quod tenetur voluptates 
                voluptatibus? Cupiditate, est? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, alias 
                consequatur cupiditate, dolores eos esse ex in inventore ipsam laudantium odio odit possimus provident 
                quod tenetur voluptates voluptatibus? Cupiditate, est?`
            }
        ];
    }
}
