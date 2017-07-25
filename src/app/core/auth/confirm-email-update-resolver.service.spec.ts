import { TestBed, inject } from '@angular/core/testing';
import { Router } from '@angular/router';

import { STUBLocalStorageService } from '../local-storage/local-storage.service.stub';
import { ConfirmEmailUpdateResolver } from './confirm-email-update-resolver.service';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { STUBHttpService } from '../http/http.service.stub';
import { STUBUserService } from '../user/user.service.stub';
import { HttpService } from '../http/http.service';
import { UserService } from '../user/user.service';
import { LangService } from '../lang/lang.service';
import { STUBLogger } from '../logger/logger.stub';
import { STUBRouter } from '../spec/stubs';
import { Logger } from '../logger/logger';

describe('ConfirmEmailUpdateResolver', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ConfirmEmailUpdateResolver, {provide: HttpService, useValue: STUBHttpService}, LangService,
                {provide: Router, useValue: STUBRouter}, {provide: UserService, useClass: STUBUserService},
                {provide: LocalStorageService, useClass: STUBLocalStorageService}, {provide: Logger, useValue: STUBLogger}]
        });
    });

    it('should be created', inject([ConfirmEmailUpdateResolver], (service: ConfirmEmailUpdateResolver) => {
        return expect(service).toBeTruthy();
    }));
});
