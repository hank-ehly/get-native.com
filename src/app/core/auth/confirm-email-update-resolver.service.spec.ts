import { TestBed, inject } from '@angular/core/testing';

import { ConfirmEmailUpdateResolver } from './confirm-email-update-resolver.service';

describe('ConfirmEmailUpdateResolver', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ConfirmEmailUpdateResolver]
        });
    });

    it('should be created', inject([ConfirmEmailUpdateResolver], (service: ConfirmEmailUpdateResolver) => {
        return expect(service).toBeTruthy();
    }));
});
