/**
 * stubs
 * get-native.com
 *
 * Created by henryehly on 2016/11/23.
 */

import { NavigationExtras, Router } from '@angular/router';

export const STUBPasswords = {
    veryWeak: 'very weak',
    weak: 'we@k',
    good: 'go0D12',
    strong: 'sTr0nG12',
    veryStrong: 'very_sTr0nG12'
};

export const STUBRouter = <Router>{
    navigate(commands: any[], extras?: NavigationExtras): Promise<boolean> {
        return null;
    }
};
