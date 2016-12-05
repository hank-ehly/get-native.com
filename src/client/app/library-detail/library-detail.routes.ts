/**
 * library-detail.routes
 * get-native.com
 *
 * Created by henryehly on 2016/12/05.
 */

import { Route } from '@angular/router';

import { LibraryDetailComponent } from './index';

export const LibraryDetailRoutes: Route[] = [
    {
        path: 'library/:id',
        component: LibraryDetailComponent
    }
];
