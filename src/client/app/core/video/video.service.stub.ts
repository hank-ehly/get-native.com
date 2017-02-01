/**
 * video.service.stub
 * get-native.com
 *
 * Created by henryehly on 2017/02/01.
 */

import { VideoService } from './video.service';

export const STUBVideoService = <VideoService>{
    updateSearchQuery$: {
        subscribe(): void {
            return;
        }
    },

    updateSearchQuery(query: string): void {
        return;
    }
};
