/**
 * settings-routing.module
 * get-native.com
 *
 * Created by henryehly on 2016/12/09.
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsComponent } from './settings.component';
import { GeneralComponent } from './general/general.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { SecurityComponent } from './security/security.component';
import { AuthGuard } from '../core/auth/auth-guard.service';

const settingsRoutes: Routes = [
    {
        path: 'settings',
        component: SettingsComponent,
        canActivateChild: [AuthGuard],
        children: [
            {
                path: '',
                component: GeneralComponent,
                data: {
                    title: 'Settings'
                }
            },
            {
                path: 'notifications',
                component: NotificationsComponent,
                data: {
                    title: 'Settings'
                }
            },
            {
                path: 'security',
                component: SecurityComponent,
                data: {
                    title: 'Settings'
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(settingsRoutes)],
    exports: [RouterModule]
})
export class SettingsRoutingModule {
}
