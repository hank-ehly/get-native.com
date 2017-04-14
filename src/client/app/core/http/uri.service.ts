/**
 * uri.service
 * get-native.com
 *
 * Created by henryehly on 2017/02/01.
 */

import { Injectable } from '@angular/core';

import * as _ from 'lodash';

@Injectable()
export class URIService {
    generateURIForEndpointWithParams(params: any, endpoint: any): string {
        let matches = endpoint.url.match(/:[a-z]+/g);

        if (!matches) {
            return endpoint.url;
        }

        let url = endpoint.url;

        _.forIn(matches, match => {
            let key = match.substr(1);

            if (params[key]) {
                url = _.replace(endpoint.url, match, params[key]);
            } else {
                throw new Error(`Could not find value for key '${key}' in requestArgs.`);
            }
        });

        return url;
    }
}
