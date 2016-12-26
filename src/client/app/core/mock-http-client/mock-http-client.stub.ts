/**
 * mock-http-client.stub
 * get-native.com
 *
 * Created by henryehly on 2016/12/26.
 */

import { VideosShowId } from '../resources/videos-show-id';
import { MockHTTPClient } from './mock-http-client';

import { Observable } from 'rxjs/Observable';

export const STUBMockHTTPClient = <MockHTTPClient>{
    getVideosShowId(id: number): Observable<VideosShowId> {
        return Observable.of();
        // return null;
    }
};
