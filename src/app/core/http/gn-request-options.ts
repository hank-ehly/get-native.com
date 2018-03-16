/**
 * gn-request-options
 * getnative.org
 *
 * Created by henryehly on 2017/02/01.
 */

import { HttpHeaders, HttpParams } from '@angular/common/http';

export interface GNRequestOptions {
    body?: Object;
    headers?: HttpHeaders;
    params?: HttpParams;
    replace?: Object;
    url?: string;
    method?: 'DELETE' | 'GET' | 'HEAD' | 'JSONP' | 'OPTIONS';
}
