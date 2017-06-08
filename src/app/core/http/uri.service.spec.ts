/**
 * uri.service.spec
 * get-native.com
 *
 * Created by henryehly on 2017/02/01.
 */

import { URIService } from './uri.service';
import { APIConfig } from './api-config';
import { APIHandle } from './api-handle';

describe('URIService', () => {
    let service;

    beforeEach(() => {
        service = new URIService();
    });

    it('should replace the \':id\' in \'/videos/:id\' with the integer \'2\'', () => {
        const endpoint = APIConfig.get(APIHandle.VIDEO);

        const expected = '/videos/2';
        const actual = service.generateURIForEndpointWithParams({id: 2}, endpoint);

        expect(actual).toEqual(expected);
    });
});
