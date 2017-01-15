/**
 * mock-http-client.stub
 * get-native.com
 *
 * Created by henryehly on 2016/12/26.
 */

import { MockHTTPClient } from './mock-http-client';
import { Video, Videos, Categories, CuedVideos, User } from '../index';

import { Observable } from 'rxjs/Observable';

export const STUBMockHTTPClient = <MockHTTPClient>{
    GET_video(id: number): Observable<Video> {
        return Observable.of(<Video>{
            'id': 2244994983,
            'id_str': '2244994983',
            'cued': true,
            'description': `This is a description about the video. This video is a video and I want to tell you that it is a video as well.
                            If you happen to like videos that this might be a video that you like because you like videos. Of course, if you
                            don\'t like videos then you probably shouldn\'t watch this video.`,
            'speaker': {
                'id': 123456,
                'id_str': '123456',
                'description': 'Harold Ford is a man from Kansas City, MO. He loves the Chiefs and listens to samba.',
                'name': 'Harold Ford',
                'thumbnail_image_url': 'https://stg.get-native.com/assets/mock/man-smiling.jpg'
            },
            'topic': {
                'id': 123456,
                'id_str': '123456',
                'name': 'Talking to customers'
            },
            'loop_count': 7156,
            'loop_velocity': 2.4960000000000004,
            'thumbnail_image_url': '',
            'video_url': 'https://stg.get-native.com/assets/mock/video.mov',
            'related_videos': {
                'records': [
                    {
                        'id': 2,
                        'id_str': '2',
                        'created_at': 'Sat Dec 14 04:35:55 +0000 2015',
                        'length': 68,
                        'loop_count': 25,
                        'topic': {
                            'name': 'How to fly a kite'
                        },
                        'speaker': {
                            'name': 'Benjamin Franklin'
                        }
                    },
                    {
                        'id': 3,
                        'id_str': '3',
                        'created_at': 'Tue Jun 9 12:00:00 +0000 2015',
                        'length': 80,
                        'loop_count': 1602,
                        'topic': {
                            'name': 'Writing a memoir'
                        },
                        'speaker': {
                            'name': 'Thomas Jefferson'
                        }
                    }
                ],
                'count': 2
            },
            'liked': false,
            'like_count': 10,
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
    },

    GET_videos(): Observable<Videos> {
        return Observable.of(<Videos>{
                'count': 5,
                'records': [
                    {
                        'created_at': 'Sat Dec 14 04:35:55 +0000 2015',
                        'id_str': '1',
                        'id': 1,
                        'speaker': {
                            'name': 'Harold Ford'
                        },
                        'topic': {
                            'name': 'Talking to customers'
                        },
                        'loop_count': 7156,
                        'loop_velocity': 2.4960000000000004,
                        'thumbnail_image_url': 'XXX',
                        'video_url': 'https://stg.get-native.com/assets/mock/video.mov',
                        'length': 68
                    },
                    {
                        'created_at': 'Wed Jan 11 04:35:55 +0000 2017',
                        'id_str': '2',
                        'id': 2,
                        'speaker': {
                            'name': 'Benjamin Franklin'
                        },
                        'topic': {
                            'name': 'How to change a light-bulb'
                        },
                        'loop_count': 1011,
                        'loop_velocity': 2.4960000000000004,
                        'thumbnail_image_url': 'XXX',
                        'video_url': 'https://stg.get-native.com/assets/mock/video.mov',
                        'length': 73
                    },
                    {
                        'created_at': 'Tue Aug 9 04:35:55 +0000 2016',
                        'id_str': '3',
                        'id': 3,
                        'speaker': {
                            'name': 'Jesse James'
                        },
                        'topic': {
                            'name': 'Robbing a bank'
                        },
                        'loop_count': 9941,
                        'loop_velocity': 2.4960000000000004,
                        'thumbnail_image_url': 'XXX',
                        'video_url': 'https://stg.get-native.com/assets/mock/video.mov',
                        'length': 45
                    },
                    {
                        'created_at': 'Tue Mar 14 04:35:55 +0000 2017',
                        'id_str': '4',
                        'id': 4,
                        'speaker': {
                            'name': 'Aretha Franklin'
                        },
                        'topic': {
                            'name': 'American Singers'
                        },
                        'loop_count': 10503,
                        'loop_velocity': 2.4960000000000004,
                        'thumbnail_image_url': 'XXX',
                        'video_url': 'https://stg.get-native.com/assets/mock/video.mov',
                        'length': 122
                    },
                    {
                        'created_at': 'Thu Jan 12 04:35:55 +0000 2017',
                        'id_str': '5',
                        'id': 5,
                        'speaker': {
                            'name': 'Britney Spears'
                        },
                        'topic': {
                            'name': 'High-School Troubles'
                        },
                        'loop_count': 3,
                        'loop_velocity': 2.4960000000000004,
                        'thumbnail_image_url': 'XXX',
                        'video_url': 'https://stg.get-native.com/assets/mock/video.mov',
                        'length': 89
                    }
                ]
            });
    },

    GET_categories(): Observable<Categories> {
        return Observable.of(<Categories>{
                'records': [
                    {
                        'name': 'Business',
                        'topics': {
                            'records': [
                                {
                                    'name': 'Meeting Preparation'
                                },
                                {
                                    'name': 'Business Cards'
                                },
                                {
                                    'name': 'Greeting Co-Workers'
                                }
                            ],
                            'count': 3
                        }
                    },
                    {
                        'name': 'Holidays',
                        'topics': {
                            'records': [
                                {
                                    'name': 'Holding Hands'
                                },
                                {
                                    'name': 'Meeting the Parents'
                                }
                            ],
                            'count': 2
                        }
                    },
                    {
                        'name': 'Travel',
                        'topics': {
                            'records': [
                                {
                                    'name': 'Subcategory 1'
                                },
                                {
                                    'name': 'Subcategory 2'
                                },
                                {
                                    'name': 'Subcategory 3'
                                },
                                {
                                    'name': 'Subcategory 4'
                                },
                                {
                                    'name': 'Subcategory 5'
                                }
                            ],
                            'count': 5
                        }
                    }
                ],
                'count': 3
            });
    },

    GET_cued_videos(): Observable<CuedVideos> {
        return Observable.of(<CuedVideos>{
                'count': 4,
                'records': [
                    {
                        'created_at': 'Sat Dec 14 04:35:55 +0000 2015',
                        'id_str': '1',
                        'id': 1,
                        'speaker': {
                            'name': 'Harold Ford'
                        },
                        'topic': {
                            'name': 'Talking to customers'
                        },
                        'loop_count': 7156,
                        'loop_velocity': 2.4960000000000004,
                        'thumbnail_image_url': 'XXX',
                        'video_url': 'https://stg.get-native.com/assets/mock/video.mov',
                        'length': 68
                    },
                    {
                        'created_at': 'Wed Jan 11 04:35:55 +0000 2017',
                        'id_str': '2',
                        'id': 2,
                        'speaker': {
                            'name': 'Benjamin Franklin'
                        },
                        'topic': {
                            'name': 'How to change a light-bulb'
                        },
                        'loop_count': 1011,
                        'loop_velocity': 2.4960000000000004,
                        'thumbnail_image_url': 'XXX',
                        'video_url': 'https://stg.get-native.com/assets/mock/video.mov',
                        'length': 73
                    },
                    {
                        'created_at': 'Tue Aug 9 04:35:55 +0000 2016',
                        'id_str': '3',
                        'id': 3,
                        'speaker': {
                            'name': 'Jesse James'
                        },
                        'topic': {
                            'name': 'Robbing a bank'
                        },
                        'loop_count': 9941,
                        'loop_velocity': 2.4960000000000004,
                        'thumbnail_image_url': 'XXX',
                        'video_url': 'https://stg.get-native.com/assets/mock/video.mov',
                        'length': 45
                    },
                    {
                        'created_at': 'Tue Mar 14 04:35:55 +0000 2017',
                        'id_str': '4',
                        'id': 4,
                        'speaker': {
                            'name': 'Aretha Franklin'
                        },
                        'topic': {
                            'name': 'American Singers'
                        },
                        'loop_count': 10503,
                        'loop_velocity': 2.4960000000000004,
                        'thumbnail_image_url': 'XXX',
                        'video_url': 'https://stg.get-native.com/assets/mock/video.mov',
                        'length': 122
                    }
                ]
            });
    },

    GET_study_stats(): Observable<any> {
        return Observable.of(<any>{
                'lang': 'en',
                'consecutive_days': 12,
                'total_study_sessions': 45,
                'longest_consecutive_days': 15,
                'maximum_words': 502,
                'maximum_wpm': 52
            });
    },

    POST_login(credentials: any): Observable<any> {
        return Observable.of(<any>{});
    }
};
