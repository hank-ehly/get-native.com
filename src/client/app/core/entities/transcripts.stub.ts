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
            text: 'This is the English transcript. This is the text that will be displayed on the video detail page.',
            lang: 'en',
            collocations: {
                count: 3,
                records: [
                    {
                        text: 'This is the text',
                        description: 'This is the description',
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
            text: 'This is the Japanese transcript. This is the text that will be displayed on the video detail page.',
            lang: 'ja',
            collocations: {
                count: 3,
                records: [
                    {
                        text: 'This is the text',
                        description: 'This is the description',
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
        }
    ]
};
