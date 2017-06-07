/**
 * http.service.stub
 * get-native.com
 *
 * Created by henryehly on 2017/01/29.
 */

import { HttpService } from './http.service';
import { Entity } from '../entities/entity';
import { APIHandle } from './api-handle';
import { STUBResponses } from './stub-responses';

import { Observable } from 'rxjs/Observable';

export const STUBHttpService: HttpService = <HttpService>{
    request(handle: APIHandle, options?: any): Observable<Entity> {
        return Observable.of(STUBResponses.get(handle));
    }
};
