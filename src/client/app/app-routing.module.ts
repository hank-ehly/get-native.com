/**
 * app-routing.module
 * get-native.com
 *
 * Created by henryehly on 2016/12/09.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConfirmEmailResolver } from './core/auth/confirm-email-resolver.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './core/auth/auth-guard.service';
import { PageNotFoundComponent } from './static-pages/page-not-found/page-not-found.component';
import { TOSComponent } from './static-pages/tos/tos.component';
import { PrivacyComponent } from './static-pages/privacy/privacy.component';
import { HelpComponent } from './static-pages/help/help.component';
import { HomeComponent } from './static-pages/home/home.component';
import { LibraryDetailComponent } from './library/library-detail.component';
import { LibraryComponent } from './library/library.component';
import { SecurityComponent } from './settings/security/security.component';
import { NotificationsComponent } from './settings/notifications/notifications.component';
import { GeneralComponent } from './settings/general/general.component';
import { SettingsComponent } from './settings/settings.component';
import { ResultsComponent } from './study/results/results.component';
import { WritingComponent } from './study/writing/writing.component';
import { SpeakingComponent } from './study/speaking/speaking.component';
import { ShadowingComponent } from './study/shadowing/shadowing.component';
import { ListeningComponent } from './study/listening/listening.component';
import { TransitionComponent } from './study/transition/transition.component';
import { StudyComponent } from './study/study.component';
import { ListeningResolver } from './study/listening/listening-resolver.service';
import { StudySessionGuard } from './study/study-session-guard.service';
import { ResultsResolver } from './study/results/results-resolver.service';
import { WritingResolver } from './study/writing/writing-resolver.service';
import { WritingGuard } from './study/writing/writing-guard.service';
import { OAuthComponent } from './oauth.component';

const routes: Routes = [
    {
        path: '', canActivate: [AuthGuard], component: HomeComponent
    },
    {
        path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: {title: 'Dashboard'}
    },
    {
        path: 'settings', component: SettingsComponent, canActivateChild: [AuthGuard],
        children: [
            {
                path: '', component: GeneralComponent, data: {title: 'Settings'}
            },
            {
                path: 'notifications', component: NotificationsComponent, data: {title: 'Settings'}
            },
            {
                path: 'security', component: SecurityComponent, data: {title: 'Settings'}
            }
        ]
    },
    {
        path: 'library', component: LibraryComponent, canActivate: [AuthGuard], data: {title: 'Library'}
    },
    {
        path: 'library/:id', component: LibraryDetailComponent, canActivate: [AuthGuard]
    },
    {
        path: 'study', component: StudyComponent, canActivateChild: [AuthGuard], canDeactivate: [StudySessionGuard],
        children: [
            {
                path: '', component: TransitionComponent
            },
            {
                path: 'listening', resolve: {video: ListeningResolver}, component: ListeningComponent, data: {title: 'Listening'}
            },
            {
                path: 'shadowing', component: ShadowingComponent, data: {title: 'Shadowing'}
            },
            {
                path: 'speaking', component: SpeakingComponent, data: {title: 'Speaking'}
            },
            {
                path: 'writing',
                component: WritingComponent,
                data: {title: 'Writing'},
                resolve: {question: WritingResolver},
                canDeactivate: [WritingGuard]
            },
            {
                path: 'results', component: ResultsComponent, data: {title: 'Results'}, resolve: {stats: ResultsResolver}
            }
        ]
    },
    {
        path: 'help', component: HelpComponent, data: {title: 'Help'}
    },
    {
        path: 'privacy', component: PrivacyComponent, data: {title: 'Privacy Policy'}
    },
    {
        path: 'tos', component: TOSComponent, data: {title: 'Terms of Service'}
    },
    {
        path: 'confirm_email', resolve: {_: ConfirmEmailResolver}, component: DashboardComponent
    },
    {
        path: 'oauth/callback', component: OAuthComponent // dashboard resolver better suited
    },
    {
        path: '**', component: PageNotFoundComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot([]), RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
