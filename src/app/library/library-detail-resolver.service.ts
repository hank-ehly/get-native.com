import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import { GNRequestOptions } from '../core/http/gn-request-options';
import { HttpService } from '../core/http/http.service';
import { LangService } from '../core/lang/lang.service';
import { UserService } from '../core/user/user.service';
import { Entities } from '../core/entities/entities';
import { APIHandle } from '../core/http/api-handle';
import { Entity } from '../core/entities/entity';
import { Logger } from '../core/logger/logger';

import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

@Injectable()
export class LibraryDetailResolverService implements Resolve<Entity | Entities<Entity>> {

    constructor(private user: UserService,
                private lang: LangService,
                @Inject(LOCALE_ID) private localeId: string,
                private http: HttpService,
                private logger: Logger) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Entity | Entities<Entity>> {
        const id = _.toNumber(_.get(route.params, 'id'));

        if (!id) {
            this.logger.debug(this, 'No id found in route.params');
            return;
        }

        const options: GNRequestOptions = {
            replace: {
                id: id
            }
        };

        if (!this.user.isAuthenticated()) {
            const params = new HttpParams();
            options.params = params.set('lang', this.lang.languageForLocaleId(this.localeId).code);
        }

        return this.http.request(APIHandle.VIDEO, options);
    }

}
