import { TestBed, inject } from '@angular/core/testing';

import { DOMService } from './dom.service';

describe('DOMService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [DOMService]
        });
    });

    it('should be created', inject([DOMService], (service: DOMService) => {
        expect(service).toBeTruthy();
    }));
});
