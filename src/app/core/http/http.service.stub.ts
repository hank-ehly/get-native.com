/**
 * http.service.stub
 * getnativelearning.com
 *
 * Created by henryehly on 2017/01/29.
 */

import { STUBResponses } from './stub-responses';
import { HttpService } from './http.service';
import { Entity } from '../entities/entity';
import { APIHandle } from './api-handle';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

export const STUBHttpService: HttpService = <HttpService>{
    request(handle: APIHandle, options?: any): Observable<Entity> {
        return Observable.of(STUBResponses.get(handle));
    }
};
