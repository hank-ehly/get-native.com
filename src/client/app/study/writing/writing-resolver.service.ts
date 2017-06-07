/**
 * writing-resolver.service
 * get-native.com
 *
 * Created by henryehly on 2017/05/03.
 */

import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import { StudySessionService } from '../../core/study-session/study-session.service';
import { WritingQuestions } from '../../core/entities/writing-questions';
import { WritingQuestion } from '../../core/entities/writing-question';
import { HttpService } from '../../core/http/http.service';
import { APIHandle } from '../../core/http/api-handle';

import 'rxjs/add/operator/toPromise';
import * as _ from 'lodash';

@Injectable()
export class WritingResolver implements Resolve<WritingQuestion> {
    constructor(private http: HttpService, private session: StudySessionService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<WritingQuestion> {
        return this.http.request(APIHandle.WRITING_QUESTIONS, {
            params: {
                id: this.session.current.video.id
            }
        }).toPromise().then((questions: WritingQuestions) => {
            return _.sample(questions.records);
        });
    }
}
