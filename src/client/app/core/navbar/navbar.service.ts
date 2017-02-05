/**
 * navbar.service
 * get-native.com
 *
 * Created by henryehly on 2016/12/04.
 */

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

export class NavbarService {
    setTitle$: Observable<string>;
    setBackButton$: Observable<string>;
    updateSearchQuery$: Observable<string>;
    toggleSearchBar$: Observable<boolean>;

    private setTitleSource: Subject<string>;
    private setBackButtonSource: Subject<string>;
    private updateSearchQuerySource: Subject<string>;
    private toggleSearchBarSource: Subject<boolean>;

    constructor() {
        this.setTitleSource = new Subject<string>();
        this.setTitle$ = this.setTitleSource.asObservable();

        this.setBackButtonSource = new Subject<any>();
        this.setBackButton$ = this.setBackButtonSource.asObservable();

        this.updateSearchQuerySource = new Subject<string>();
        this.updateSearchQuery$ = this.updateSearchQuerySource.asObservable();

        this.toggleSearchBarSource = new Subject<boolean>();
        this.toggleSearchBar$ = this.toggleSearchBarSource.asObservable();
    }

    setTitle(title: string): void {
        this.setTitleSource.next(title);
    }

    updateSearchQuery(query: string): void {
        this.updateSearchQuerySource.next(query.trim());
    }

    didToggleSearchBar(hidden: boolean) {
        this.toggleSearchBarSource.next(hidden);
    }
}
