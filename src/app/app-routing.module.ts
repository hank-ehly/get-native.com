/**
 * app-routing.module
 * getnativelearning.com
 *
 * Created by henryehly on 2016/12/09.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../environments/environment';

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

import { MetaGuard } from '@ngx-meta/core';

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
        canActivate: [DashboardGuard, MetaGuard, OAuthGuard],
        data: {
            meta: {
                title: 'dashboard.title'
            },
            showToolbar: true,
            showNavbarSearchIcon: false
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
            showNavbarSearchIcon: false
        }
    },
    {
        path: 'library/:id',
        component: LibraryDetailComponent,
        canActivate: [MetaGuard],
        resolve: {
            video: LibraryDetailResolverService
        },
        data: {
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
        path: 'help', component: HelpComponent, children: [
            {
                path: '',
                component: HelpMainComponent,
                canActivate: [MetaGuard],
                data: {
                    showToolbar: true,
                    meta: {title: 'help.title'}
                }
            },
            {
                path: ':id',
                component: HelpArticleComponent,
                canActivate: [MetaGuard],
                data: {showToolbar: true}
            }
        ]
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
            meta: {
                title: 'pageNotFound.title'
            }
        }
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)], // {enableTracing: environment.development}
    exports: [RouterModule]
})
export class AppRoutingModule {
}
