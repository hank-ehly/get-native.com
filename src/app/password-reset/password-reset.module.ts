import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { PasswordResetResolverService } from './password-reset-resolver.service';
import { PasswordResetGuard } from './password-reset.guard';
import { PasswordResetComponent } from './password-reset.component';

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [
        PasswordResetComponent
    ],
    exports: [
        PasswordResetComponent
    ],
    providers: [
        PasswordResetResolverService,
        PasswordResetGuard
    ]
})
export class PasswordResetModule {
}
