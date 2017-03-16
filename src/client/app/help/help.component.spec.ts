/**
 * help.component.spec
 * get-native.com
 *
 * Created by henryehly on 2016/11/08.
 */

import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from '../shared/shared.module';
import { HelpComponent } from './help.component';
import { FaqService } from './faq/faq.service';

export function main() {
    let comp: HelpComponent;
    let fixture: ComponentFixture<HelpComponent>;
    let de: DebugElement;
    let el: HTMLElement;

    describe('HelpComponent', () => {
        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SharedModule, BrowserAnimationsModule],
                declarations: [HelpComponent],
                providers: [FaqService]
            }).compileComponents().then(() => {
                fixture = TestBed.createComponent(HelpComponent);
                comp = fixture.componentInstance;
                fixture.detectChanges();
            });
        }));

        it('should compile', async(() => {
            expect(fixture.nativeElement).toBeTruthy();
        }));
    });
}
