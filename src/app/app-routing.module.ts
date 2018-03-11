/**
 * app-routing.module
 * getnativelearning.com
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
import { HelpComponent } from './help/help.component';
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
import { DashboardGuard } from './dashboard/dashboard-guard.service';
import { ConfirmEmailUpdateResolver } from './core/auth/confirm-email-update-resolver.service';
import { LoginComponent } from './login/login.component';
import { ActivityComponent } from './settings/activity/activity.component';
import { HelpMainComponent } from './help/main/main.component';
import { HelpArticleComponent } from './help/article/article.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { PasswordResetResolverService } from './password-reset/password-reset-resolver.service';
import { PasswordResetCompleteComponent } from './password-reset/password-reset-complete/password-reset-complete.component';
import { PasswordResetGuard } from './password-reset/password-reset.guard';
import { LibraryDetailResolverService } from './library/library-detail-resolver.service';
import { OAuthGuard } from './core/auth/oauth.guard';
import { MetaGuard } from './core/meta.guard';
import { TitleGuard } from './core/title.guard';
import { environment } from '../environments/environment';

const routes: Routes = [
    {
        path: '', canActivate: [AuthGuard, TitleGuard, MetaGuard], component: HomeComponent, data: {
        title: 'default.title', hideNavbarTitle: true, overrideTitle: true, meta: {
            'og:image:width': 1200,
            'og:image:height': 630,
            'og:image': environment.googleStorageUrl + '/assets/images/og.jpg',
            'og:image:url': environment.googleStorageUrl + '/assets/images/og.jpg',
            'og:image:secure_url': environment.googleStorageUrl + '/assets/images/og.jpg',
            'twitter:image:src': environment.googleStorageUrl + '/assets/images/og.png',
            'twitter:description': 'default.description'
        }
    }
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [DashboardGuard, TitleGuard, MetaGuard, OAuthGuard],
        data: {
            title: 'dashboard.title',
            showToolbar: true,
            showNavbarSearchIcon: false,
            state: 'dashboard'
        }
    },
    {
        path: 'login', component: LoginComponent, outlet: 'modal'
    },
    {
        path: 'settings',
        component: SettingsComponent,
        canActivateChild: [AuthGuard, TitleGuard, MetaGuard],
        data: {state: 'settings'},
        children: [
            {
                path: '', component: GeneralComponent, data: {
                title: 'settings.general.title',
                showToolbar: true,
                state: 'settings-general'
            }
            },
            {
                path: 'notifications', component: NotificationsComponent, data: {
                title: 'settings.notification.title',
                showToolbar: true,
                state: 'settings-notification'
            }
            },
            {
                path: 'security', component: SecurityComponent, data: {
                title: 'settings.security.title',
                showToolbar: true,
                state: 'settings-security'
            }
            },
            {
                path: 'activity', component: ActivityComponent, data: {
                title: 'settings.activity.title',
                showToolbar: true,
                state: 'settings-activity'
            }
            }
        ]
    },
    {
        path: 'library', component: LibraryComponent, canActivate: [TitleGuard, MetaGuard], data: {
        title: 'library.title',
        meta: {
            'og:image': environment.googleStorageUrl + '/assets/images/feature01.jpg',
            'og:image:url': environment.googleStorageUrl + '/assets/images/feature01.jpg',
            'og:image:secure_url': environment.googleStorageUrl + '/assets/images/feature01.jpg',
            'twitter:image:src': environment.googleStorageUrl + '/assets/images/feature01.png',
            'og:image:width': 435,
            'og:image:height': 270
        },
        showToolbar: true,
        showNavbarSearchIcon: false,
        state: 'library'
    }
    },
    {
        path: 'library/:id',
        component: LibraryDetailComponent,
        canActivate: [TitleGuard, MetaGuard],
        resolve: {
            video: LibraryDetailResolverService
        },
        data: {
            showToolbar: true,
            state: 'library-detail'
        }
    },
    {
        path: 'study',
        component: StudyComponent,
        canActivateChild: [AuthGuard, TitleGuard, MetaGuard],
        canDeactivate: [StudySessionGuard],
        children: [
            {
                path: '', component: TransitionComponent
            },
            {
                path: 'listening', resolve: {video: ListeningResolver}, component: ListeningComponent, data: {
                title: 'study.listening.title'
            }
            },
            {
                path: 'shadowing', component: ShadowingComponent, data: {
                title: 'study.shadowing.title'
            }
            },
            {
                path: 'speaking', component: SpeakingComponent, data: {
                title: 'study.speaking.title'
            }
            },
            {
                path: 'writing',
                component: WritingComponent,
                resolve: {question: WritingResolver},
                data: {
                    title: 'study.writing.title'
                }
            },
            {
                path: 'results', component: ResultsComponent, resolve: {stats: ResultsResolver}, data: {
                title: 'study.results.title'
            }
            }
        ]
    },
    {
        path: 'help', component: HelpComponent, children: [
        {
            path: '',
            component: HelpMainComponent,
            canActivate: [TitleGuard, MetaGuard],
            data: {
                showToolbar: true,
                title: 'help.title'
            }
        },
        {
            path: ':id',
            component: HelpArticleComponent,
            canActivate: [TitleGuard, MetaGuard],
            data: {
                showToolbar: true
            }
        }
    ]
    },
    {
        path: 'privacy', component: PrivacyComponent, canActivate: [TitleGuard, MetaGuard], data: {
        title: 'privacy.title'

    }
    },
    {
        path: 'tos', component: TOSComponent, canActivate: [TitleGuard, MetaGuard], data: {
        title: 'tos.title'

    }
    },
    {
        path: 'confirm_email', resolve: {_: ConfirmEmailResolver}, component: DashboardComponent
    },
    {
        path: 'confirm_email_update', resolve: {_: ConfirmEmailUpdateResolver}, component: SettingsComponent
    },
    {
        path: 'reset_password', component: PasswordResetComponent, resolve: {token: PasswordResetResolverService}, data: {
        showToolbar: false,
        showNavbarSearchIcon: false
    }, canDeactivate: [PasswordResetGuard]
    },
    {
        path: 'reset_password_complete', component: PasswordResetCompleteComponent, data: {
        showToolbar: false,
        showNavbarSearchIcon: false
    }
    },
    {
        path: '**', component: PageNotFoundComponent, data: {
        title: 'pageNotFound.title'
    }
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)], // {enableTracing: environment.development}
    exports: [RouterModule]
})
export class AppRoutingModule {
}
