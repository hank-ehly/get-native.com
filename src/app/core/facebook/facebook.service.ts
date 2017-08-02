import { Injectable } from '@angular/core';

import { InitParams } from './init-params';

declare const FB: any;

@Injectable()
export class FacebookService {
    constructor() {
        // FB.AppEvents.logPageView();
    }

    init(params: InitParams): Promise<any> {
        try {
            return Promise.resolve(FB.init(params));
        } catch (e) {
            return Promise.reject(e);
        }
    }

    share(href?: string) {
        return new Promise<any>((resolve, reject) => {
            try {
                FB.ui({
                    method: 'share',
                    href: href || window.location.href
                }, (response: any) => {
                    if (!response) {
                        reject();
                    } else if (response.error) {
                        reject(response.error);
                    } else {
                        resolve(response);
                    }
                });
            } catch (e) {
                reject(e);
            }
        });
    }
}
