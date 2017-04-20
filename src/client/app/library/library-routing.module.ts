/**
 * library-routing.module
 * get-native.com
 *
 * Created by henryehly on 2016/12/05.
 */

import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { LibraryComponent } from './library.component';
import { AuthGuard } from '../core/auth/auth-guard.service';
import { LibraryDetailComponent } from './library-detail/library-detail.component';

const libraryRoutes: Routes = [
    {
        path: 'library',
        component: LibraryComponent,
        canActivate: [AuthGuard],
        data: {
            title: 'Library'
        },
        children: [
            {
                path: ':id',
                component: LibraryDetailComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(libraryRoutes)],
    exports: [RouterModule]
})
export class LibraryRoutingModule {
}
