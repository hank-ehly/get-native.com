import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

import { InitParams } from './init-params';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

declare const FB: any;

@Injectable()
export class FacebookService {
    constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    }

    init(params: InitParams): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            if (isPlatformServer(this.platformId)) {
                reject();
            }

            if (isPlatformBrowser(this.platformId)) {
                try {
                    resolve(FB.init(params));
                } catch (e) {
                    reject(e);
                }
            }
        });
    }

    share(href?: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            if (isPlatformServer(this.platformId)) {
                reject();
            }

            if (isPlatformBrowser(this.platformId)) {
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
            }
        });
    }

    logPageView(): void {
        if (isPlatformBrowser(this.platformId)) {
            FB.AppEvents.logPageView();
        }
    }
}
