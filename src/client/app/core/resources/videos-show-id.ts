/**
 * videos-show-id
 * get-native.com
 *
 * Created by henryehly on 2016/12/24.
 */

import { Speaker, Topic, DateTime, LangCode, Category, Likes, Transcripts, Questions } from '../index';

export class VideosShowId {
    favorited?: boolean;

    created_at: DateTime;

    id_str: string;

    id: number;

    speaker: Speaker;

    lang?: LangCode;

    favorite_count?: number;

    topic: Topic;

    loop_count: number;

    loop_velocity?: number;

    thumbnail_image_url: string;

    video_url: string;

    /* Todo: (See API documentation) */
    has_related_videos: boolean;

    likes: Likes;

    liked: boolean;

    length: number;

    category: Category;

    transcripts: Transcripts;

    questions: Questions;

    description: string;
}
