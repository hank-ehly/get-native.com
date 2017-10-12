import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UTCDateService } from '../../core/utc-date/utc-date.service';
import { SafeHtmlPipe } from '../../shared/safe-html/safe-html.pipe';
import { FromNowPipe } from '../../shared/from-now/from-now.pipe';
import { ActivityComponent } from './activity.component';
import { DatePipe } from '../../shared/date/date.pipe';

describe('ActivityComponent', () => {
    let component: ActivityComponent;
    let fixture: ComponentFixture<ActivityComponent>;

    beforeEach(async(() => {
        return TestBed.configureTestingModule({
            declarations: [ActivityComponent, FromNowPipe, SafeHtmlPipe, DatePipe],
            providers: [UTCDateService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ActivityComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        return expect(component).toBeTruthy();
    });
});
