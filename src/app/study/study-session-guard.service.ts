/**
 * study-session-guard.service
 * getnative.org
 *
 * Created by henryehly on 2017/05/01.
 */

import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import { StudySessionService } from '../core/study-session/study-session.service';
import { StudyComponent } from './study.component';
import { Logger } from '../core/logger/logger';

@Injectable()
export class StudySessionGuard implements CanDeactivate<StudyComponent> {

    constructor(private logger: Logger, private session: StudySessionService) {
    }

    canDeactivate(component: StudyComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot,
                  nextState?: RouterStateSnapshot): boolean {
        this.logger.debug(this, 'canDeactivate', nextState);

        if (component.flags.isModalVisible || currentState.url.indexOf('/study/results') === 0) {
            this.session.end();

            return true;
        }

        component.quitURL = nextState.url;
        component.displayConfirmationModal();

        return false;
    }

}
