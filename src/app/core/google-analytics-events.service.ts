/**
 * google-analytics-events.service
 * getnativelearning.com
 *
 * Created by henryehly on 2017/11/02.
 */

import { Injectable } from '@angular/core';
import { Logger } from './logger/logger';

@Injectable()
export class GoogleAnalyticsEventsService {

    constructor(private logger: Logger) {
    }

    emitEvent(eventCategory: string, eventAction: string, eventLabel: string = null, eventValue: number = null) {
        const eventConfig = {
            eventCategory: eventCategory,
            eventLabel: eventLabel,
            eventAction: eventAction,
            eventValue: eventValue
        };

        this.logger.debug(this, 'emitEvent', eventConfig);
        ga('send', 'event', eventConfig);
    }

}
