/**
 * navbar.service
 * get-native.com
 *
 * Created by henryehly on 2016/12/04.
 */

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/mapTo';
import * as _ from 'lodash';

export class NavbarService {
    query$               = new Subject<string>();

    title$               = new Subject<string>();
    backButtonTitle$     = new BehaviorSubject<string>(null);
    queueButtonTitle$    = new BehaviorSubject<string>('WAIT..');

    studyOptionsVisible$ = new Subject<boolean>();
    searchBarVisible$    = new Subject<boolean>();
    studyOptionsEnabled$ = new Subject<boolean>();

    onClickQueue$        = new Subject<void>();
    onClickStart$        = new Subject<void>();

    // sources
    progressBarVisibleSource: Subject<boolean> = new Subject<boolean>();
    private emitDisplayMagnifyingGlass$: Subject<boolean>;

    // emitters
    progressBarVisibleEmitted$: Observable<boolean> = this.progressBarVisibleSource.asObservable();
    displayMagnifyingGlassEmitted$: Observable<boolean>;

    progress: any = {
        countdownEmitted$: new BehaviorSubject<number>(0),
        listeningEmitted$: new BehaviorSubject<number>(0),
        shadowingEmitted$: new BehaviorSubject<number>(0),
         speakingEmitted$: new BehaviorSubject<number>(0),
          writingEmitted$: new BehaviorSubject<number>(0)
    };

    updateQuery(value: string): void {
        this.query$.next(_.trim(value));
    }

    showProgressBar(): void {
        this.progressBarVisibleSource.next(true);
    }

    hideProgressBar(): void {
        this.progressBarVisibleSource.next(false);
    }

    showMagnifyingGlass(): void {
        this.emitDisplayMagnifyingGlass$.next(true);
    }

    hideMagnifyingGlass(): void {
        this.emitDisplayMagnifyingGlass$.next(false);
    }

    constructor() {
        this.searchBarVisible$.mapTo('').subscribe(this.query$);

        this.emitDisplayMagnifyingGlass$ = new Subject();
        this.displayMagnifyingGlassEmitted$ = this.emitDisplayMagnifyingGlass$.asObservable();
    }
}
