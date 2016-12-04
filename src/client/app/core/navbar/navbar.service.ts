/**
 * navbar.service
 * get-native.com
 *
 * Created by henryehly on 2016/12/04.
 */

import { Subject } from 'rxjs/Subject';

export class NavbarService {
    setTitleSource = new Subject<string>();
    setTitle$ = this.setTitleSource.asObservable();

    setTitle(title: string): void {
        this.setTitleSource.next(title);
    }
}
