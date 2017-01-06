/**
 * mock-http-client.stub
 * get-native.com
 *
 * Created by henryehly on 2016/12/26.
 */

import { Video } from '../index';
import { MockHTTPClient } from './mock-http-client';

import { Observable } from 'rxjs/Observable';

export const STUBMockHTTPClient = <MockHTTPClient>{
    getVideosShowId(id: number): Observable<Video> {
        return Observable.of(<Video>{
            'id': 2244994983,
            'id_str': '2244994983',
            'favorited': true,
            'description': `This is a description about the video. This video is a video and I want to tell you that it is a video as well.
                            If you happen to like videos that this might be a video that you like because you like videos. Of course, if you
                            don\'t like videos then you probably shouldn\'t watch this video.`,
            'speaker': {
                'id': 123456,
                'id_str': '123456',
                'description': 'Harold Ford is a man from Kansas City, MO. He loves the Chiefs and listens to samba.',
                'name': 'Harold Ford',
                'thumbnail_image_url': ''
            },
            'topic': {
                'id': 123456,
                'id_str': '123456',
                'name': 'Talking to customers'
            },
            'loop_count': 7156,
            'loop_velocity': 2.4960000000000004,
            'thumbnail_image_url': '',
            'video_url': '',
            'related_videos': {
                'records': [
                    {
                        'id': 2244994984,
                        'id_str': '2244994984',
                        'created_at': 'Sat Dec 14 04:35:55 +0000 2015',
                        'length': 68,
                        'topic': {
                            'name': 'Talking to customers'
                        },
                        'speaker': {
                            'name': 'Harold Ford'
                        },
                        'thumbnail_image_url': ''
                    },
                    {
                        'id': 2244994985,
                        'id_str': '2244994985',
                        'created_at': 'Sat Dec 14 04:35:55 +0000 2015',
                        'length': 68,
                        'topic': {
                            'name': 'Talking to customers'
                        },
                        'speaker': {
                            'name': 'Harold Ford'
                        },
                        'thumbnail_image_url': ''
                    }
                ],
                'count': 2
            },
            'liked': false,
            'likes_count': 10,
            'length': 68,
            'transcripts': {
                'count': 2,
                'records': [
                    {
                        'id': 123,
                        'id_str': '123',
                        'text': `This is the English transcript. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab adipisci animi
                                 atque blanditiis, commodi culpa distinctio ducimus fugit iste mollitia nam neque odit qui quibusdam soluta!
                                 Dolor ea placeat soluta. Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, dicta distinctio 
                                 temporibus voluptatum. Aliquam expedita fuga impedit ipsanatus.Lorem ipsum dolor sit amet, consectetur 
                                 adipisicing elit. Corporis distinctio enim error facere fugit harum,ipsum, iure laudan tium, omnis rerum 
                                 tempore ullam ut. Iste iure!`,
                        'lang': 'en',
                        'collocations': {
                            'count': 1,
                            'records': [
                                {
                                    'text': 'This is the text',
                                    'description': 'This is the description',
                                    'pronunciation': 'ˈðɪs ˈɪz ðə ˈtɛkst',
                                    'usage_examples': {
                                        'count': 3,
                                        'records': [
                                            {
                                                'text': 'This is the text in which will appear..'
                                            },
                                            {
                                                'text': 'I will tell you that this is the text.'
                                            },
                                            {
                                                'text': 'I don\'t really know if this is the text.'
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    },
                    {
                        'id': 124,
                        'id_str': '124',
                        'text': `じゅげむじゅげむごこうのすりきれかいじゃりすいぎょのすいぎょうまつうんらいまつふうらいまつくうねるところにすむところやぶらこうじのぶらこ
                                 うじぱいぽぱいぽぱいぽのしゅーりんがんしゅーりんがんのぐーりんだいぐーりんだいのぽんぽこぴーのぽんぽこなのちょうきゅうめいのちょうすけ。
                                 じゅげむじゅげむごこうのすりきれかいじゃりすいぎょのすいぎょうまつうんらいまつふうらいまつくうねるところにすむところやぶらこうじのぶらこ
                                 うじぱいぽぱいぽぱいぽのしゅーりんがんしゅーりんがんのぐーりんだいぐーりんだいのぽんぽこぴーのぽんぽこなのちょうきゅうめいの。`,
                        'lang': 'ja',
                        'collocations': {
                            'count': 1,
                            'records': [
                                {
                                    'text': 'This is the text',
                                    'description': 'This is the description',
                                    'pronunciation': 'ˈtɛkst ˈtɛkst',
                                    'usage_examples': {
                                        'count': 3,
                                        'records': [
                                            {
                                                'text': 'じゅげむじゅげむごこうのすりきれ..'
                                            },
                                            {
                                                'text': 'ぱいぽぱいぽぱいぽ'
                                            },
                                            {
                                                'text': 'しゅーりんがんしゅーりんがんのぐーりんだいぐーりんだい'
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        });
    }
};
