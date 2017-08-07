import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileOverlayComponent } from './mobile-overlay.component';

describe('MobileOverlayComponent', () => {
    let component: MobileOverlayComponent;
    let fixture: ComponentFixture<MobileOverlayComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MobileOverlayComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MobileOverlayComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        return expect(component).toBeTruthy();
    });
});
