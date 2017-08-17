import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpMainComponent } from './main.component';

describe('HelpMainComponent', () => {
    let component: HelpMainComponent;
    let fixture: ComponentFixture<HelpMainComponent>;

    beforeEach(async(() => {
        return TestBed.configureTestingModule({
            declarations: [HelpMainComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HelpMainComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        return expect(component).toBeTruthy();
    });
});
