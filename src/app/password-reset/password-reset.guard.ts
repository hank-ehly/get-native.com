import { ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate } from '@angular/router';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

import { PasswordResetComponent } from './password-reset.component';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class PasswordResetGuard implements CanDeactivate<PasswordResetComponent> {

    hasBeenConfirmed = false;

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    }

    canDeactivate(component: PasswordResetComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot,
                  nextState?: RouterStateSnapshot): boolean {
        if (this.hasBeenConfirmed) {
            return true;
        } else if (component.canDeactivate) {
            return true;
        } else if ((component.model.password || component.model.confirm) && isPlatformBrowser(this.platformId)) {
            if (window.confirm('You have unsaved data on this page. Exiting will erase this data.')) {
                this.hasBeenConfirmed = true;
                return true;
            }
            return false;
        }
        return true;
    }

}
