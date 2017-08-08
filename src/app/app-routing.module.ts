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
import { DashboardGuard } from './dashboard/dashboard-guard.service';
import { DashboardResolveService } from './dashboard/dashboard-resolve.service';
import { ConfirmEmailUpdateResolver } from './core/auth/confirm-email-update-resolver.service';
import { LoginComponent } from './login/login.component';

import { MetaGuard } from '@ngx-meta/core';
import { ActivityComponent } from './settings/activity/activity.component';

const routes: Routes = [
    {
        path: '', canActivate: [AuthGuard, MetaGuard], component: HomeComponent, data: {
            meta: {
                title: 'default.title',
                override: true
            },
            hideNavbarTitle: true
        }
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [DashboardGuard, MetaGuard],
        resolve: {user: DashboardResolveService},
        data: {
            meta: {
                title: 'dashboard.title'
            },
            showToolbar: true,
            showNavbarSearchIcon: true
        }
    },
    {
        path: 'login', component: LoginComponent, outlet: 'modal'
    },
    {
        path: 'settings', component: SettingsComponent, canActivateChild: [AuthGuard, MetaGuard], children: [
            {
                path: '', component: GeneralComponent, data: {
                    meta: {
                        title: 'settings.general.title'
                    },
                    showToolbar: true
                }
            },
            {
                path: 'notifications', component: NotificationsComponent, data: {
                    meta: {
                        title: 'settings.notification.title'
                    },
                    showToolbar: true
                }
            },
            {
                path: 'security', component: SecurityComponent, data: {
                    meta: {
                        title: 'settings.security.title'
                    },
                    showToolbar: true
                }
            },
            {
                path: 'activity', component: ActivityComponent, data: {
                    meta: {
                        title: 'settings.activity.title'
                    },
                    showToolbar: true
                }
            }
        ]
    },
    {
        path: 'library', component: LibraryComponent, canActivate: [MetaGuard], data: {
            meta: {
                title: 'library.title'
            },
            showToolbar: true,
            showNavbarSearchIcon: true
        }
    },
    {
        path: 'library/:id', component: LibraryDetailComponent, canActivate: [MetaGuard], data: {
            showToolbar: true
        }
    },
    {
        path: 'study', component: StudyComponent, canActivateChild: [AuthGuard, MetaGuard], canDeactivate: [StudySessionGuard], children: [
            {
                path: '', component: TransitionComponent
            },
            {
                path: 'listening', resolve: {video: ListeningResolver}, component: ListeningComponent, data: {
                    meta: {
                        title: 'study.listening.title'
                    }
                }
            },
            {
                path: 'shadowing', component: ShadowingComponent, data: {
                    meta: {
                        title: 'study.shadowing.title'
                    }
                }
            },
            {
                path: 'speaking', component: SpeakingComponent, data: {
                    meta: {
                        title: 'study.speaking.title'
                    }
                }
            },
            {
                path: 'writing',
                component: WritingComponent,
                resolve: {question: WritingResolver},
                canDeactivate: [WritingGuard],
                data: {
                    meta: {
                        title: 'study.writing.title'
                    }
                }
            },
            {
                path: 'results', component: ResultsComponent, resolve: {stats: ResultsResolver}, data: {
                    meta: {
                        title: 'study.results.title'
                    }
                }
            }
        ]
    },
    {
        path: 'help', component: HelpComponent, canActivate: [MetaGuard], data: {
            meta: {
                title: 'help.title'
            }
        }
    },
    {
        path: 'privacy', component: PrivacyComponent, canActivate: [MetaGuard], data: {
            meta: {
                title: 'privacy.title'
            }
        }
    },
    {
        path: 'tos', component: TOSComponent, canActivate: [MetaGuard], data: {
            meta: {
                title: 'tos.title'
            }
        }
    },
    {
        path: 'confirm_email', resolve: {_: ConfirmEmailResolver}, component: DashboardComponent
    },
    {
        path: 'confirm_email_update', resolve: {_: ConfirmEmailUpdateResolver}, component: SettingsComponent
    },
    {
        path: '**', component: PageNotFoundComponent, data: {
            meta: {
                title: 'pageNotFound.title'
            }
        }
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
