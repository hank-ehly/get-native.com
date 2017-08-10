/**
 * footer.component
 * getnativelearning.com
 *
 * Created by henryehly on 2016/11/06.
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { Languages } from '../../core/lang/languages';
import { Logger } from '../../core/logger/logger';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

interface LocalizedLink {
    label: string;
    url: string;
}

@Component({
    selector: 'gn-footer',
    templateUrl: 'footer.component.html',
    styleUrls: ['footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {
    year = new Date().getFullYear();
    languages = Languages;

    langLinks$: Observable<LocalizedLink[]> = this.router.events.filter(e => e instanceof NavigationEnd).pluck('url').map(u => {
        const urls = [];
        for (const lang of this.languages) {
            urls.push({label: lang.name, url: ['/', lang.code, u].join('')});
        }
        return urls;
    });

    constructor(private logger: Logger, private router: Router) {
    }

    ngOnInit(): void {
        this.logger.debug(this, 'OnInit');
    }

    ngOnDestroy(): void {
        this.logger.debug(this, 'OnDestroy');
    }
}
