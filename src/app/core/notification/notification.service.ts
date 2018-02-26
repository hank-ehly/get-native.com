import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Observable';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class NotificationService {

    permission$ = new BehaviorSubject<NotificationPermission>(this.supported ? (<any>Notification).permission : 'denied');

    get supported(): boolean {
        if (isPlatformBrowser(this.platformId)) {
            return 'Notification' in window;
        }

        return false;
    }

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    }

    requestPermission(): Observable<NotificationPermission> {
        if (!this.supported) {
            return Observable.of(<NotificationPermission>'denied');
        }

        return Observable.create(function (observer) {
            Notification.requestPermission(function (permission) {
                observer.next(permission);
                observer.complete();
            });
        });
    }

}
