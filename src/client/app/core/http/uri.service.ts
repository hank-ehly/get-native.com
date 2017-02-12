/**
 * uri.service
 * get-native.com
 *
 * Created by henryehly on 2017/02/01.
 */

import { Injectable } from '@angular/core';

import { Logger } from '../logger/logger';

@Injectable()
export class URIService {
    constructor(private logger: Logger) {
    }

    generateURIForEndpointWithParams(urlParams: any, endpoint: any): string {
        let matches = endpoint.url.match(/:[a-z]+/g);

        if (!matches) {
            return endpoint.url;
        }

        this.logger.debug(this, matches);

        for (let match of matches) {
            let key = match.substr(1);
            if (urlParams[key]) {
                endpoint.url = endpoint.url.replace(match, urlParams[key]);
            } else {
                throw new Error(`Could not find value for key '${key}' in requestArgs.`);
            }
        }

        return endpoint.url;
    }
}
