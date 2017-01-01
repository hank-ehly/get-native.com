/**
 * transcripts.stub
 * get-native.com
 *
 * Created by henryehly on 2016/12/29.
 */

import { Transcripts } from './transcripts';

export const STUBTranscripts: Transcripts = {
    count: 2,
    records: [
        {
            id: 123,
            id_str: '123',
            text: `This is the English transcript. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab adipisci animi atque 
                   blanditiis, commodi culpa distinctio ducimus fugit iste mollitia nam neque odit qui quibusdam soluta! Dolor ea placeat 
                   soluta. Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, dicta distinctiotemporibus voluptatum. Aliquam 
                   expedita fuga impedit ipsanatus.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis distinctio enim error 
                   facere fugit harum,ipsum, iure laudan tium, omnis rerum tempore ullam ut. Iste iure!`,
            lang: 'en',
            collocations: {
                count: 3,
                records: [
                    {
                        text: 'This is the text',
                        description: 'This is the description',
                        pronunciation: 'ˈðɪs ˈɪz ðə ˈtɛkst',
                        usage_examples: {
                            count: 3,
                            records: [
                                {
                                    text: 'This is the text in which will appear..'
                                },
                                {
                                    text: 'I will tell you that this is the text.'
                                },
                                {
                                    text: 'I don\'t really know if this is the text.'
                                }
                            ]
                        }
                    }
                ]
            }
        },
        {
            id: 124,
            id_str: '124',
            text: `じゅげむじゅげむごこうのすりきれかいじゃりすいぎょのすいぎょうまつうんらいまつふうらいまつくうねるところにすむところやぶらこうじのぶらこうじぱいぽぱいぽぱ
                   いぽのしゅーりんがんしゅーりんがんのぐーりんだいぐーりんだいのぽんぽこぴーのぽんぽこなのちょうきゅうめいのちょうすけ。じゅげむじゅげむごこうのすりきれかい
                   じゃりすいぎょのすいぎょうまつうんらいまつふうらいまつくうねるところにすむところやぶらこうじのぶらこうじぱいぽぱいぽぱいぽのしゅーりんがんしゅーりんがんの
                   ぐーりんだいぐーりんだいのぽんぽこぴーのぽんぽこなのちょうきゅうめいのちょうすけ。`,
            lang: 'ja',
            collocations: {
                count: 3,
                records: [
                    {
                        text: 'This is the text',
                        description: 'This is the description',
                        pronunciation: 'ˈtɛkst ˈtɛkst',
                        usage_examples: {
                            count: 3,
                            records: [
                                {
                                    text: 'じゅげむじゅげむごこうのすりきれ..'
                                },
                                {
                                    text: 'ぱいぽぱいぽぱいぽ'
                                },
                                {
                                    text: 'しゅーりんがんしゅーりんがんのぐーりんだいぐーりんだい'
                                }
                            ]
                        }
                    }
                ]
            }
        }
    ]
};
