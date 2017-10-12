/**
 * gn-request-options
 * getnativelearning.com
 *
 * Created by henryehly on 2017/02/01.
 */

import { URLSearchParams } from '@angular/http';

export interface GNRequestOptions {
    params?: any;
    search?: URLSearchParams;
    body?: any;
}
