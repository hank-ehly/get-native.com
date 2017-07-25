import { TestBed, inject } from '@angular/core/testing';

import { DashboardResolveService } from './dashboard-resolve.service';

describe('DashboardResolveService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [DashboardResolveService]
        });
    });

    it('should be created', inject([DashboardResolveService], (service: DashboardResolveService) => {
        return expect(service).toBeTruthy();
    }));
});
