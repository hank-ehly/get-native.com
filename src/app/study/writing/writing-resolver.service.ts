/**
 * writing-resolver.service
 * getnative.org
 *
 * Created by henryehly on 2017/05/03.
 */

import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import { StudySessionService } from '../../core/study-session/study-session.service';
import { WritingQuestion } from '../../core/entities/writing-question';
import { HttpService } from '../../core/http/http.service';
import { Entities } from '../../core/entities/entities';
import { APIHandle } from '../../core/http/api-handle';
import { Logger } from '../../core/logger/logger';

import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

@Injectable()
export class WritingResolver implements Resolve<WritingQuestion> {
    constructor(private http: HttpService, private session: StudySessionService, private logger: Logger) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<WritingQuestion> {
        if (this.session.current.writingQuestion) {
            this.logger.debug(this, 'using cached study session writing question:', this.session.current.writingQuestion);
            return Observable.of(this.session.current.writingQuestion);
        }

        this.logger.debug(this, 'no cached writing question present. requesting from API');
        const options = {replace: {id: this.session.current.video.id}};
        return this.http.request(APIHandle.WRITING_QUESTIONS, options).map((questions: Entities<WritingQuestion>) => {
            const question = _.sample(questions.records);
            this.session.updateCurrentSessionCache({writingQuestion: question});
            return question;
        });
    }
}
