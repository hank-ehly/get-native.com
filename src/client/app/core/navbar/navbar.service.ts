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

    private setTitleSource: Subject<string>;
    private setBackButtonSource: Subject<string>;

    constructor() {
        this.setTitleSource = new Subject<string>();
        this.setBackButtonSource = new Subject<any>();

        this.setTitle$ = this.setTitleSource.asObservable();
        this.setBackButton$ = this.setBackButtonSource.asObservable();
    }

    setTitle(title: string): void {
        this.setTitleSource.next(title);
    }

    setBackButton(title: string): void {
        this.setBackButtonSource.next(title);
    }
}
