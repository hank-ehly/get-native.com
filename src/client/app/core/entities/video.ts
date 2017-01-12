/**
 * video
 * get-native.com
 *
 * Created by henryehly on 2017/01/06.
 */

import { Entity, Speaker, Topic, Transcripts, Videos } from './index';

export interface Video extends Entity {
    description?: string;
    cued?: boolean;
    length?: number;
    liked?: boolean;
    like_count?: number;
    loop_count?: number;
    loop_velocity?: number;
    related_videos?: Videos;
    speaker?: Speaker;
    thumbnail_image_url?: string;
    topic?: Topic;
    transcripts?: Transcripts;
    video_url?: string;
}
