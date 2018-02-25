import { Inject, Injectable, PLATFORM_ID, Renderer2, RendererFactory2, ViewEncapsulation } from '@angular/core';

import { Logger } from '../logger/logger';

import { Subject } from 'rxjs/Subject';
import * as _ from 'lodash';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class DOMService {

    alertMessage$ = new Subject<string>();
    htmlTag: HTMLHtmlElement;
    renderer: Renderer2;

    constructor(private rendererFactory: RendererFactory2, private logger: Logger, @Inject(PLATFORM_ID) private platformId: Object) {
        if (isPlatformBrowser(this.platformId)) {
            this.htmlTag = <HTMLHtmlElement>_.first(document.children);

            if (this.htmlTag.tagName.toLowerCase() !== 'html') {
                throw new Error('Could not find HTML tag in DOMService');
            }

            this.renderer = rendererFactory.createRenderer(this.htmlTag, {
                id: 'gn',
                encapsulation: ViewEncapsulation.None,
                styles: [],
                data: {}
            });
        }
    }

    pathForMouseEvent(e: MouseEvent): any[] {
        if (_.has(e, 'path')) {
            return e['path'];
        } else if (_.isFunction(e['composedPath'])) {
            return e['composedPath']();
        } else {
            return null;
        }
    }

    enableScroll(enable: boolean): void {
        if (enable) {
            this.renderer.removeClass(this.htmlTag, 'scrolling-disabled');
        } else {
            this.renderer.addClass(this.htmlTag, 'scrolling-disabled');
        }
    }

    alert(message: string): void {
        this.logger.debug(this, `show alert: ${message}`);
        this.alertMessage$.next(message);
    }

}
