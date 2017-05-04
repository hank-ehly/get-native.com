/**
 * video
 * get-native.com
 *
 * Created by henryehly on 2017/01/06.
 */

import { Entity } from './entity';
import { Videos } from './videos';
import { Speaker } from './speaker';
import { Subcategory } from './subcategory';
import { Transcripts } from './transcripts';
import { LanguageCode } from '../typings/language-code';

export interface Video extends Entity {
    description?: string;
    cued?: boolean;
    language_code?: LanguageCode;
    length?: number;
    liked?: boolean;
    like_count?: number;
    loop_count?: number;
    loop_velocity?: number;
    related_videos?: Videos;
    speaker?: Speaker;
    picture_url?: string;
    subcategory?: Subcategory;
    transcripts?: Transcripts;
    video_url?: string;
}
