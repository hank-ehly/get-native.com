/**
 * facebook.service.stub
 * get-native.com
 *
 * Created by henryehly on 2017/08/02.
 */

import { FacebookService } from './facebook.service';

export class STUBFacebookService extends FacebookService {
    share(href?: string): Promise<any> {
        return Promise.resolve();
    }
}
