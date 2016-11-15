/**
 * home.component
 * get-native.com
 *
 * Created by henryehly on 2016/11/06.
 */

import { Component, OnInit } from '@angular/core';

import { FeatureDescriptionService } from './feature-description/index';
import { FeatureDescription } from './feature-description/feature-description';
import { Logger } from 'angular2-logger/core';

import { LoginService } from '../core/index';

@Component({
    moduleId: module.id,
    selector: 'gn-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})

export class HomeComponent implements OnInit {
    largeDescriptions: FeatureDescription[] = [];
    smallDescriptions: FeatureDescription[] = [];

    constructor(private featureDescriptionService: FeatureDescriptionService,
                private loginService: LoginService,
                private logger: Logger) {
    }

    ngOnInit(): void {
        this.largeDescriptions = this.featureDescriptionService.getLargeFeatureDescriptions();
        this.smallDescriptions = this.featureDescriptionService.getSmallFeatureDescriptions();
    }

    onShowSignInModal(): void {
        this.logger.debug('[HomeComponent]: onShowSignInModal()');
        this.loginService.openModal();
    }
}
