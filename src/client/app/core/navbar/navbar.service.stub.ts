/**
 * navbar.service.stub
 * get-native.com
 *
 * Created by henryehly on 2016/12/26.
 */

import { NavbarService } from './navbar.service';

export const STUBNavbarService = <NavbarService>{
    setTitle(title: string): void {
        return;
    },

    updateSearchQuery$: {
        subscribe(): void {
            return;
        }
    },

    updateSearchQuery(query: string): void {
        return;
    }
};
