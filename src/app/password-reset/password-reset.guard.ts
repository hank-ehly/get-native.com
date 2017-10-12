import { ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate } from '@angular/router';
import { Injectable } from '@angular/core';

import { PasswordResetComponent } from './password-reset.component';

@Injectable()
export class PasswordResetGuard implements CanDeactivate<PasswordResetComponent> {

    hasBeenConfirmed = false;

    canDeactivate(component: PasswordResetComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot,
                  nextState?: RouterStateSnapshot): boolean {
        if (this.hasBeenConfirmed) {
            return true;
        } else if (component.canDeactivate) {
            return true;
        } else if (component.model.password || component.model.confirm) {
            if (window.confirm('You have unsaved data on this page. Exiting will erase this data.')) {
                this.hasBeenConfirmed = true;
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    }

}
