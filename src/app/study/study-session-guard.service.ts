/**
 * study-session-guard.service
 * getnativelearning.com
 *
 * Created by henryehly on 2017/05/01.
 */

import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import { StudySessionService } from '../core/study-session/study-session.service';
import { LocalStorageService } from '../core/local-storage/local-storage.service';
import { StudyComponent } from './study.component';
import { Logger } from '../core/logger/logger';

@Injectable()
export class StudySessionGuard implements CanDeactivate<StudyComponent> {
    constructor(private logger: Logger, private session: StudySessionService, private localStorage: LocalStorageService) {
    }

    canDeactivate(component: StudyComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot,
                  nextState?: RouterStateSnapshot): boolean {
        this.logger.debug(this, 'canDeactivate');
        this.session.end();
        return true;
    }
}
