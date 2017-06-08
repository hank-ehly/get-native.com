/**
 * transcripts.stub
 * get-native.com
 *
 * Created by henryehly on 2016/12/29.
 */

import { Transcript } from './transcript';
import { Entities } from './entities';

export const STUBTranscripts: Entities<Transcript> = {
    count: 2,
    records: [
        {
            id: 123,
            text: `This is the English transcript. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab adipisci animi atque
                   blanditiis, commodi culpa distinctio ducimus fugit iste mollitia nam neque odit qui quibusdam soluta! Dolor ea placeat
                   soluta. Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, dicta distinctiotemporibus voluptatum. Aliquam
                   expedita fuga impedit ipsanatus.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis distinctio enim error
                   facere fugit harum,ipsum, iure laudan tium, omnis rerum tempore ullam ut. Iste iure!`,
            language: {
                code: 'en',
                name: 'English'
            },
            collocations: {
                count: 3,
                records: [
                    {
                        text: 'This is the text',
                        description: 'This is the description',
                        ipa_spelling: 'ˈðɪs ˈɪz ðə ˈtɛkst',
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
            text: `じゅげむじゅげむごこうのすりきれかいじゃりすいぎょのすいぎょうまつうんらいまつふうらいまつくうねるところにすむところやぶらこうじのぶらこうじぱいぽぱいぽぱ
                   いぽのしゅーりんがんしゅーりんがんのぐーりんだいぐーりんだいのぽんぽこぴーのぽんぽこなのちょうきゅうめいのちょうすけ。じゅげむじゅげむごこうのすりきれかい
                   じゃりすいぎょのすいぎょうまつうんらいまつふうらいまつくうねるところにすむところやぶらこうじのぶらこうじぱいぽぱいぽぱいぽのしゅーりんがんしゅーりんがんの
                   ぐーりんだいぐーりんだいのぽんぽこぴーのぽんぽこなのちょうきゅうめいのちょうすけ。`,
            language: {
                code: 'ja',
                name: '日本語'
            },
            collocations: {
                count: 3,
                records: [
                    {
                        text: 'This is the text',
                        description: 'This is the description',
                        ipa_spelling: 'ˈtɛkst ˈtɛkst',
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
