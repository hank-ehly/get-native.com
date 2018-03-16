/**
 * navbar.service
 * getnative.org
 *
 * Created by henryehly on 2016/12/04.
 */

import { QueueButtonState } from './queue-button-state';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/mapTo';
import * as _ from 'lodash';

export class NavbarService {
    query$ = new Subject<string>();

    title$ = new Subject<string>();
    backButtonTitle$ = new BehaviorSubject<string>(null);
    queueButtonState$ = new BehaviorSubject<QueueButtonState>(QueueButtonState.DEFAULT);

    studyOptionsVisible$ = new Subject<boolean>();
    searchBarVisible$ = new Subject<boolean>();

    onClickQueue$ = new Subject<void>();
    onClickStart$ = new Subject<void>();

    // sources
    progressBarVisibleSource: Subject<boolean> = new Subject<boolean>();

    // emitters
    progressBarVisibleEmitted$: Observable<boolean> = this.progressBarVisibleSource.asObservable();

    constructor() {
        this.searchBarVisible$.mapTo('').subscribe(this.query$);
    }

    updateQuery(value: string): void {
        this.query$.next(_.trim(value));
    }

    showProgressBar(): void {
        this.progressBarVisibleSource.next(true);
    }

    hideProgressBar(): void {
        this.progressBarVisibleSource.next(false);
    }
}
