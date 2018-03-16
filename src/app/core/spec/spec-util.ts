/**
 * spec-util
 * getnative.org
 *
 * Created by henryehly on 2016/11/18.
 */

import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

export class SpecUtil {

    constructor(private fixture: ComponentFixture<any>) {
    }

    getDebugEl(selector: string): DebugElement {
        return this.fixture.debugElement.query(By.css(selector));
    }

    getNativeEl(selector: string): HTMLElement {
        return this.getDebugEl(selector).nativeElement;
    }

}
