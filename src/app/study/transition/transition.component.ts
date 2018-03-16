/**
 * transition.component
 * getnative.org
 *
 * Created by henryehly on 2016/12/12.
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StudySessionService } from '../../core/study-session/study-session.service';
import { environment } from '../../../environments/environment';
import { Logger } from '../../core/logger/logger';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/switch';
import 'rxjs/add/operator/take';
import 'rxjs/observable/never';

@Component({
    selector: 'gn-transition',
    templateUrl: 'transition.component.html',
    styleUrls: ['transition.component.scss']
})
export class TransitionComponent implements OnInit {

    sectionName = this.session.sectionName;
    isProd = environment.production;

    flags = {
        processing: {
            navigate: false
        }
    };

    constructor(private logger: Logger, private router: Router, private session: StudySessionService) {
    }

    ngOnInit(): void {
        this.logger.debug(this, 'OnInit');
        this.session.resetSectionTimer();
    }

    onClickContinue(): void {
        this.flags.processing.navigate = true;
        this.router.navigate(['/study/' + this.sectionName])
            .then(this.onNavigateFinish.bind(this))
            .catch(this.onNavigateFinish.bind(this));
    }

    private onNavigateFinish(): void {
        this.flags.processing.navigate = false;
    }

}
