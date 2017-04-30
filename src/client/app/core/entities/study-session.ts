/**
 * study-session
 * get-native.com
 *
 * Created by henryehly on 2017/04/30.
 */

import { Entity } from './entity';

export interface StudySession extends Entity {
    video_id: number;
    study_time: number;
}
