import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { PasswordResetResolverService } from './password-reset-resolver.service';
import { PasswordResetGuard } from './password-reset.guard';
import { PasswordResetComponent } from './password-reset.component';
import { PasswordResetCompleteComponent } from './password-reset-complete/password-reset-complete.component';

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [
        PasswordResetComponent,
        PasswordResetCompleteComponent
    ],
    exports: [
        PasswordResetComponent,
        PasswordResetCompleteComponent
    ],
    providers: [
        PasswordResetResolverService,
        PasswordResetGuard
    ]
})
export class PasswordResetModule {
}
