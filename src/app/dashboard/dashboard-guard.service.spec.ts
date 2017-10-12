import { TestBed, inject } from '@angular/core/testing';

import { STUBLocalStorageService } from '../core/local-storage/local-storage.service.stub';
import { LocalStorageService } from '../core/local-storage/local-storage.service';
import { STUBHttpService } from '../core/http/http.service.stub';
import { STUBUserService } from '../core/user/user.service.stub';
import { DashboardGuard } from './dashboard-guard.service';
import { HttpService } from '../core/http/http.service';
import { STUBLogger } from '../core/logger/logger.stub';
import { UserService } from '../core/user/user.service';
import { LangService } from '../core/lang/lang.service';
import { Logger } from '../core/logger/logger';

describe('DashboardGuard', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [DashboardGuard, {provide: UserService, useClass: STUBUserService}, {provide: Logger, useValue: STUBLogger},
                LangService, {provide: LocalStorageService, useClass: STUBLocalStorageService},
                {provide: HttpService, useValue: STUBHttpService}]
        });
    });

    it('should be created', inject([DashboardGuard], (service: DashboardGuard) => {
        expect(service).toBeTruthy();
    }));
});
