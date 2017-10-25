import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Inject, Injectable, LOCALE_ID } from '@angular/core';

import { HttpService } from '../core/http/http.service';
import { LangService } from '../core/lang/lang.service';
import { UserService } from '../core/user/user.service';
import { APIHandle } from '../core/http/api-handle';
import { Logger } from '../core/logger/logger';
import { Video } from '../core/entities/video';

import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

@Injectable()
export class LibraryDetailResolverService implements Resolve<Video> {

    constructor(private user: UserService,
                private lang: LangService,
                @Inject(LOCALE_ID) private localeId: string,
                private http: HttpService,
                private logger: Logger) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Video> {
        const id = _.toNumber(_.get(route.params, 'id'));

        if (!id) {
            this.logger.debug(this, 'No id found in route.params');
            return;
        }

        const options = {
            params: {
                id: id
            }
        };

        if (!this.user.isAuthenticated()) {
            const search = new URLSearchParams();
            search.set('lang', this.lang.languageForLocaleId(this.localeId).code);
            _.set(options, 'search', search);
        }

        return this.http.request(APIHandle.VIDEO, options);
    }

}
