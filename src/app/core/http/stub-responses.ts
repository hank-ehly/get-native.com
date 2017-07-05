/**
 * stub-responses
 * get-native.com
 *
 * Created by henryehly on 2017/01/29.
 */

import { APIHandle } from './api-handle';
import { Category } from '../entities/category';
import { Entities } from '../entities/entities';
import { Video } from '../entities/video';

export const STUBResponses = new Map<APIHandle, any>([
    [APIHandle.CREATE_SESSION, {}],
    [APIHandle.VIDEO, <Video>{
        cued: true,
        description: 'In "talking to customers," Harold Ford describes the daily interactions between businessmen and clients.',
        id: 2244994983,
        speaker: {
            id: 123456,
            description: 'Harold Ford is a man from Kansas City, MO. He loves the Chiefs and listens to samba.',
            name: 'Harold Ford',
            picture_url: 'https://example.com'
        },
        subcategory: {
            id: 123456,
            name: 'Talking to customers'
        },
        loop_count: 7156,
        picture_url: 'https://example.com',
        video_url: 'https://example.com',
        language: {
            name: 'English',
            code: 'en'
        },
        related_videos: {
            records: [
                {
                    id: 2,
                    length: 68,
                    loop_count: 25,
                    subcategory: {
                        name: 'How to fly a kite'
                    },
                    speaker: {
                        name: 'Benjamin Franklin'
                    },
                    created_at: 'Sat Dec 14 04:35:55 +0000 2015',
                    cued: false,
                    picture_url: 'https://example.com',
                    language: {
                        name: 'English',
                        code: 'en'
                    }
                },
                {
                    id: 3,
                    length: 80,
                    loop_count: 102,
                    subcategory: {
                        name: 'Writing a memoir'
                    },
                    speaker: {
                        name: 'Thomas Jefferson'
                    },
                    created_at: 'Tue Jun 9 12:00:00 +0000 2015',
                    cued: true,
                    picture_url: 'https://example.com',
                    language: {
                        name: 'English',
                        code: 'en'
                    }
                }
            ],
            count: 2
        },
        like_count: 10,
        liked: true,
        length: 68,
        transcripts: {
            count: 1,
            records: [
                {
                    id: 123,
                    text: 'This is the English transcript. This is the text that will be displayed on the video detail page.',
                    language: {
                        code: 'en',
                        name: 'English'
                    },
                    collocation_occurrences: {
                        count: 3,
                        records: [
                            {
                                text: 'This is the text',
                                description: 'This is the description',
                                ipa_spelling: 'ˈðɪs ˈɪz ðə ˈtɛkst',
                                usage_examples: {
                                    count: 3,
                                    records: [
                                        {text: 'This is the text in which will appear..'},
                                        {text: 'I will tell you that this is the text.'},
                                        {text: 'I don\'t really know if this is the text.'}
                                    ]
                                }
                            }
                        ]
                    }
                }
            ]
        }
    }],
    [APIHandle.VIDEOS, <Entities<Video>>{
        count: 2,
        records: [
            {
                id: 1,
                cued: true,
                created_at: 'Sat Dec 14 04:35:55 +0000 2015',
                speaker: {
                    name: 'Harold Ford'
                },
                subcategory: {
                    name: 'Talking to customers',
                    id: 123
                },
                loop_count: 7156,
                picture_url: 'https://example.com',
                video_url: '../../../assets/mock/video.mov',
                length: 68
            },
            {
                id: 2,
                cued: false,
                created_at: 'Wed Jan 11 04:35:55 +0000 2017',
                speaker: {
                    name: 'Benjamin Franklin'
                },
                subcategory: {
                    name: 'How to change a light-bulb',
                    id: 456
                },
                loop_count: 1011,
                picture_url: 'https://example.com',
                video_url: '../../../assets/mock/video.mov',
                length: 73
            }
        ]
    }],
    [APIHandle.CATEGORIES, <Entities<Category>>{
        records: [
            {
                id: 1,
                name: 'Business',
                subcategories: {
                    records: [
                        {
                            id: 1,
                            name: 'Meeting Preparation'
                        },
                        {
                            id: 2,
                            name: 'Business Cards'
                        },
                        {
                            id: 3,
                            name: 'Greeting Co-Workers'
                        }
                    ],
                    count: 3
                }
            },
            {
                id: 2,
                name: 'Holidays',
                subcategories: {
                    records: [
                        {
                            id: 4,
                            name: 'Holding Hands'
                        },
                        {
                            id: 5,
                            name: 'Meeting the Parents'
                        }
                    ],
                    count: 2
                }
            },
            {
                id: 3,
                name: 'Travel',
                subcategories: {
                    records: [
                        {
                            id: 6,
                            name: 'Subcategory 1'
                        },
                        {
                            id: 7,
                            name: 'Subcategory 2'
                        },
                        {
                            id: 8,
                            name: 'Subcategory 3'
                        },
                        {
                            id: 9,
                            name: 'Subcategory 4'
                        },
                        {
                            id: 10,
                            name: 'Subcategory 5'
                        }
                    ],
                    count: 5
                }
            },
            {
                id: 4,
                name: 'School',
                subcategories: {
                    records: [
                        {
                            id: 11,
                            name: 'First Day'
                        },
                        {
                            id: 12,
                            name: 'Making Friends'
                        }
                    ],
                    count: 2
                }
            },
            {
                id: 5,
                name: 'Transportation',
                subcategories: {
                    records: [
                        {
                            id: 13,
                            name: 'Taking the Train'
                        },
                        {
                            id: 14,
                            name: 'Riding Horses'
                        },
                        {
                            id: 15,
                            name: 'Bus Passes'
                        },
                        {
                            id: 16,
                            name: 'Taking Long Road Trips'
                        }
                    ],
                    count: 4
                }
            }
        ],
        count: 5
    }],
    [APIHandle.STUDY_STATS, <any>{
        lang: 'en',
        total_time_studied: 500,
        consecutive_days: 12,
        total_study_sessions: 45,
        longest_consecutive_days: 15,
        maximum_words: 502,
        maximum_wpm: 52
    }],
    [APIHandle.CREATE_USER, <any>{
        id: 2244994983,
        email: 'john_doe@example.com',
        browser_notifications_enabled: false,
        email_notifications_enabled: false,
        email_verified: false,
        default_study_language: {
            code: 'en',
            name: 'English'
        },
        picture_url: '',
        is_silhouette_picture: true
    }],
    [APIHandle.WRITING_ANSWERS, <any>{
        count: 1,
        records: [{
            id: 1,
            answer: 'This is a test answer',
            created_at: 'Wed Jan 11 04:35:55 +0000 2017',
            study_session_id: 58,
            lang: 'ja',
            writing_question: {
                text: 'How do you ...?'
            }
        }]
    }],
    [APIHandle.LIKE_VIDEO, {}],
    [APIHandle.UNLIKE_VIDEO, {}],
    [APIHandle.UPDATE_USER, {}],
    [APIHandle.EDIT_PASSWORD, {}],
    [APIHandle.EDIT_EMAIL, {}],
    [APIHandle.RESEND_CONFIRMATION_EMAIL, {}],
    [APIHandle.QUEUE_VIDEO, {}],
    [APIHandle.DEQUEUE_VIDEO, {}],
    [APIHandle.CONFIRM_EMAIL, <any>{
        id: 2244994983,
        email: 'test@email.com',
        browser_notifications_enabled: false,
        email_notifications_enabled: true,
        email_verified: true,
        default_study_language: {
            name: 'English',
            code: 'en'
        },
        picture_url: 'https://dummyimage.com/100x100.png/5fa2dd/ffffff',
        is_silhouette_picture: false
    }],
    [APIHandle.START_STUDY_SESSION, <any>{
        id: 123456,
        study_time: 600,
        is_completed: false,
        video_id: 123456
    }],
    [APIHandle.COMPLETE_STUDY_SESSION, {}],
    [APIHandle.CREATE_WRITING_ANSWER, {}],
    [APIHandle.WRITING_QUESTIONS, <any>{
        count: 2,
        records: [
            {
                id: 123,
                text: 'What is ...',
                example_answer: 'I think that ...'
            },
            {
                id: 456,
                text: 'What is ...',
                example_answer: 'I think that ...'
            }
        ]
    }]
]);
