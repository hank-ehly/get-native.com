import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module';
import { RouterModule } from '@angular/router';

import { routes } from './app.routes';

@NgModule({
    imports: [
        BrowserModule,
        CoreModule,
        RouterModule.forRoot(routes),
        HomeModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [{
        provide: APP_BASE_HREF,
        useValue: '<%= APP_BASE %>'
    }],
    bootstrap: [AppComponent]
})

export class AppModule {
}
