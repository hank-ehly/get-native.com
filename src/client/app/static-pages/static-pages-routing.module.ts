/**
 * static-pages-routing.module
 * get-native.com
 *
 * Created by henryehly on 2017/04/21.
 */

import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { HelpComponent } from './help/help.component';
import { AuthGuard } from '../core/auth/auth-guard.service';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { TOSComponent } from './tos/tos.component';

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: HomeComponent,
        data: {
            title: 'Home'
        }
    },
    {
        path: 'help',
        component: HelpComponent,
        data: {
            title: 'Help'
        }
    },
    {
        path: 'privacy',
        component: PrivacyComponent,
        data: {
            title: 'Privacy Policy'
        }
    },
    {
        path: 'tos',
        component: TOSComponent,
        data: {
            title: 'Terms of Service'
        }
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StaticPagesRoutingModule {
}
