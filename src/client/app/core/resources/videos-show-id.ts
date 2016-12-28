/**
 * videos-show-id
 * get-native.com
 *
 * Created by henryehly on 2016/12/24.
 */

import { Speaker, Topic, Transcript } from '../index';
import { DateTime } from '../typings/datetime';
import { Category } from '../entities/category';
import { Likes } from '../entities/likes';

/* Todo: Model each API response (in a clean way) */
export class VideosShowId {
    favorited?: boolean;

    created_at: DateTime;

    id_str: string;
    id: number;

    speaker: Speaker;

    /* Todo: Model */
    lang?: string;

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

    /* Todo: Model */
    transcripts: any;

    /* Todo: Model */
    questions: any;

    description: string;
}
