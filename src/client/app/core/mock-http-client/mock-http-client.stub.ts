/**
 * mock-http-client.stub
 * get-native.com
 *
 * Created by henryehly on 2016/12/26.
 */

import { VideosShowId } from '../resources/videos-show-id';
import { MockHTTPClient } from './mock-http-client';

import { Observable } from 'rxjs/Observable';

export const STUBMockHTTPClient = <MockHTTPClient>{
    getVideosShowId(id: number): Observable<VideosShowId> {
        return Observable.of({
            favorited: true,
            created_at: 'Sat Dec 14 04:35:55 +0000 2015',
            id_str: '2244994983',
            id: 2244994983,
            speaker: {
                id: 123456,
                id_str: '123456',
                description: 'Harold Ford is a man from Kansas City, MO. He loves the Chiefs and listens to samba.',
                name: 'Harold Ford',
                created_at: 'Sat Dec 14 04:35:55 +0000 2015',
                lang: 'en',
                gender: 'male',
                location: 'Kansas City, MO'
            },
            description: 'This is a description about the video. This video is a video and I want to tell you that it...',
            lang: 'en',
            favorite_count: 342,
            topic: {
                id: 123456,
                id_str: '123456',
                created_at: 'Sat Dec 14 04:35:55 +0000 2015',
                name: 'Talking to customers'
            },
            loop_count: 7156,
            loop_velocity: 2.4960000000000004,
            thumbnail_image_url: 'TODO',
            video_url: 'TODO',
            has_related_videos: true,
            liked: true,
            likes: {
                records: [
                    {
                        created_at: 'Sat Dec 14 04:35:55 +0000 2015',
                        'user': {
                        },
                        id: 456,
                        id_str: '456'
                    }
                ],
                count: 10
            },
            length: 68,
            category: {
                name: 'Business',
                id: 123456,
                id_str: '123456',
                created_at: 'Sat Dec 14 04:35:55 +0000 2015'
            },
            transcripts: {
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
            },
            questions: {
                count: 4,
                records: [
                    {
                        id: 123456,
                        id_str: '123456',
                        text: 'What do you think of this text?',
                        example_answer: 'I think this text is really great. I really do. I think if this text were a person, I would...'
                    }
                ]
            }
        });
    }
};
