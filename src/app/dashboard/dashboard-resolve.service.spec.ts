import { TestBed, inject } from '@angular/core/testing';

import { DashboardResolveService } from './dashboard-resolve.service';
import { STUBLocalStorageService } from '../core/local-storage/local-storage.service.stub';
import { STUBLogger } from '../core/logger/logger.stub';
import { STUBHttpService } from '../core/http/http.service.stub';
import { STUBUserService } from '../core/user/user.service.stub';
import { HttpService } from '../core/http/http.service';
import { Logger } from '../core/logger/logger';
import { UserService } from '../core/user/user.service';
import { LocalStorageService } from '../core/local-storage/local-storage.service';
import { LangService } from '../core/lang/lang.service';

describe('DashboardResolveService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [DashboardResolveService, {provide: LocalStorageService, useClass: STUBLocalStorageService},
                {provide: Logger, useValue: STUBLogger}, {provide: HttpService, useValue: STUBHttpService},
                {provide: UserService, useClass: STUBUserService}, LangService]
        });
    });

    it('should be created', inject([DashboardResolveService], (service: DashboardResolveService) => {
        return expect(service).toBeTruthy();
    }));
});
