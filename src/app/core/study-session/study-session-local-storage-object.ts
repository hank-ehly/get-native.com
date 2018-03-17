/**
 * study-session-local-storage-object
 * getnative.org
 *
 * Created by henryehly on 2017/06/08.
 */

import { WritingQuestion } from '../entities/writing-question';
import { WritingAnswer } from '../entities/writing-answer';
import { StudySession } from '../entities/study-session';
import { Video } from '../entities/video';

export interface StudySessionLocalStorageObject {
    session?: StudySession;
    video?: Video;
    writingAnswer?: WritingAnswer;
    writingQuestion?: WritingQuestion;
}
