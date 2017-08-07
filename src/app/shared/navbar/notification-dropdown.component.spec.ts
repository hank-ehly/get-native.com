import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationDropdownComponent } from './notification-dropdown.component';

describe('NotificationDropdownComponent', () => {
    let component: NotificationDropdownComponent;
    let fixture: ComponentFixture<NotificationDropdownComponent>;

    beforeEach(async(() => {
        return TestBed.configureTestingModule({
            declarations: [NotificationDropdownComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NotificationDropdownComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        return expect(component).toBeTruthy();
    });
});
