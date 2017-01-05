/**
 * library-detail-routing.module
 * get-native.com
 *
 * Created by henryehly on 2016/12/05.
 */

import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { LibraryDetailComponent } from './library-detail.component';
import { AuthGuard } from '../core/index';

const libraryDetailRoutes: Routes = [
    {
        path: 'library/:id',
        canActivate: [AuthGuard],
        component: LibraryDetailComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(libraryDetailRoutes)],
    exports: [RouterModule]
})

export class LibraryDetailRoutingModule {
}
