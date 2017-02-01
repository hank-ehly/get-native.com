/**
 * uri.service.spec
 * get-native.com
 *
 * Created by henryehly on 2017/02/01.
 */

import { URIService } from './uri.service';
import { STUBLogger } from '../logger/logger.stub';
import { APIConfig } from './api-config';
import { APIHandle } from './api-handle';

export function main() {
    let service = new URIService(STUBLogger);

    describe('URIService', () => {
        it('should replace the \':id\' in \'/videos/:id\' with the integer \'2\'', () => {
            let endpoint = APIConfig.get(APIHandle.VIDEO);

            let expected = '/videos/2';
            let actual = service.generateURIForEndpointWithParams({id: 2}, endpoint);

            expect(actual).toEqual(expected);
        });
    });
}
