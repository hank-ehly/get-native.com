import { Component, Output } from '@angular/core';

import { Subject } from 'rxjs/Subject';

@Component({
    selector: 'gn-activity-dropdown',
    templateUrl: './activity-dropdown.component.html',
    styleUrls: ['./activity-dropdown.component.scss']
})
export class ActivityDropdownComponent {
    private clickSeeAllActivitySource = new Subject();
    @Output() clickSeeAllActivityEmitted$ = this.clickSeeAllActivitySource.asObservable();
    newCount = 0;

    onClickSeeAllActivity(): void {
        this.clickSeeAllActivitySource.next();
    }
}
