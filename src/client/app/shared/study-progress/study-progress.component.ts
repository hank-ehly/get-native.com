/**
 * study-progress.component
 * get-native.com
 *
 * Created by henryehly on 2016/12/13.
 */

import { Component, OnInit } from '@angular/core';

import { Logger } from '../../core/logger/logger';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { StudyProgressService } from '../../core/study-progress/study-progress.service';

@Component({
    moduleId: module.id,
    selector: 'gn-study-progress',
    templateUrl: 'study-progress.component.html',
    styleUrls: ['study-progress.component.css']
})
export class StudyProgressComponent implements OnInit {
    listening$ = this.progress.listening$;
    shadowing$ = this.progress.shadowing$;
    speaking$  = this.progress.speaking$;
    writing$   = this.progress.writing$;

    constructor(private logger: Logger, private progress: StudyProgressService) {
    }

    ngOnInit() {
        this.logger.debug(this, 'OnInit');
    }
}
