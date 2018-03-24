import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

import { InitParams } from './init-params';

@Injectable()
export class FacebookService {

    get _fb(): any {
        if (isPlatformBrowser(this.platformId)) {
            if (window['FB']) {
                return FB;
            }
        }
        return {
            init: (params: InitParams) => {
                return new Promise(() => {
                    return;
                });
            },

            ui: (x: any, y: any) => {
                return;
            },

            AppEvents: {
                logPageView: () => {
                    return;
                }
            }
        };
    }

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    }

    init(params: InitParams): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            if (isPlatformServer(this.platformId)) {
                return;
            }

            if (isPlatformBrowser(this.platformId)) {
                try {
                    return resolve(this._fb.init(params));
                } catch (e) {
                    reject(e);
                }
            }

            return;
        });
    }

    share(href?: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            if (isPlatformServer(this.platformId)) {
                return;
            }

            if (isPlatformBrowser(this.platformId)) {
                try {
                    const config = {
                        method: 'share',
                        href: href || window.location.href
                    };

                    this._fb.ui(config, (response: any) => {
                        if (response && response.error) {
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
            this._fb.AppEvents.logPageView();
        }
    }
}
