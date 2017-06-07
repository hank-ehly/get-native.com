/**
 * study-session-local-storage-object
 * get-native.com
 *
 * Created by henryehly on 2017/06/08.
 */

import { WritingAnswer } from '../entities/writing-answer';
import { StudySession } from '../entities/study-session';
import { Video } from '../entities/video';

export interface StudySessionLocalStorageObject {
    session?: StudySession;
    video?: Video;
    writingAnswer?: WritingAnswer;
}
