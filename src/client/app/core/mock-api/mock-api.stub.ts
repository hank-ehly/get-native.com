/**
 * mock-api.stub
 * get-native.com
 *
 * Created by henryehly on 2016/12/26.
 */

import { VideosShowId } from './videos-show-id';
import { MockAPI } from './mock-api';

import { Observable } from 'rxjs/Observable';

export const STUBMockAPI = <MockAPI>{
    getVideosShowId(id: number): Observable<VideosShowId> {
        return null;
    }
};
