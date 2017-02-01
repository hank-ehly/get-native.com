/**
 * video.service
 * get-native.com
 *
 * Created by henryehly on 2017/02/01.
 */

import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class VideoService {
    updateSearchQuery$: Observable<string>;
    private updateSearchQuerySource: Subject<string>;

    constructor() {
        this.updateSearchQuerySource = new Subject();
        this.updateSearchQuery$ = this.updateSearchQuerySource.asObservable();
    }

    updateSearchQuery(query: string): void {
        this.updateSearchQuerySource.next(query);
    }
}
