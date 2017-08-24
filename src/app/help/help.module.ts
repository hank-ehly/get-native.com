import { NgModule } from '@angular/core';

import { HelpComponent } from './help.component';
import { HelpMainComponent } from './main/main.component';
import { HelpArticleComponent } from './article/article.component';
import { SharedModule } from '../shared/shared.module';
import { HelpService } from './help.service';
import { HelpArticle20170818Component } from './article/20170818/20170818.component';
import { HelpArticle20170825Component } from './article/20170825/20170825.component';

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [
        HelpComponent,
        HelpArticleComponent,
        HelpMainComponent,
        HelpArticle20170818Component,
        HelpArticle20170825Component
    ],
    exports: [
        HelpComponent,
        HelpArticleComponent,
        HelpMainComponent
    ],
    providers: [HelpService]
})
export class HelpModule {
}
