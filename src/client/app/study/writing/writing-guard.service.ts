/**
 * writing-guard.service
 * get-native.com
 *
 * Created by henryehly on 2017/05/05.
 */

import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import { StudySessionService } from '../../core/study-session/study-session.service';
import { HttpService } from '../../core/http/http.service';
import { WritingComponent } from './writing.component';
import { APIHandle } from '../../core/http/api-handle';
import { Logger } from '../../core/logger/logger';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class WritingGuard implements CanDeactivate<WritingComponent> {
    constructor(private logger: Logger, private http: HttpService, private session: StudySessionService) {
    }

    canDeactivate(component: WritingComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot,
                  nextState?: RouterStateSnapshot): Promise<boolean> {
        this.logger.debug(this, 'canDeactivate');

        // todo: What should happen if this request fails
        return this.http.request(APIHandle.CREATE_WRITING_ANSWER, {
            body: {
                study_session_id: this.session.current.session.id,
                writing_question_id: component.question.id,
                answer: component.answer,
                word_count: component.wordCount
            }
        }).toPromise().then(() => {
            return true;
        });
    }
}
