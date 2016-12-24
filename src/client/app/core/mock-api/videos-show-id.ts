/**
 * videos-show-id
 * get-native.com
 *
 * Created by henryehly on 2016/12/24.
 */

import { Topic } from '../models/topic';
import { Transcript } from '../models/transcript';
import { Speaker } from '../models/speaker';

/* Todo: Model each API response (in a clean way) */
/* Add 'description' to the API documentation (!) */
export class VideosShowId {
    favorited?: boolean;

    /* Todo: Model */
    created_at: string;

    id_str: string;
    id: number;

    speaker: Speaker;

    /* Todo: Model */
    lang?: string;

    favorite_count?: number;

    /* Todo: Model */
    topic: Topic;

    loop_count: number;
    loop_velocity?: number;
    thumbnail_image_url: string;
    video_url: string;

    /* Todo: (See API documentation) */
    has_related_videos: boolean;

    /* Todo: Model */
    likes: any;

    liked: boolean;
    length: number;

    /* Todo: Model */
    category: string;

    /* Todo: Model */
    transcripts: Transcript[];

    /* Todo: Model */
    questions: any[];

    description: string;
}
