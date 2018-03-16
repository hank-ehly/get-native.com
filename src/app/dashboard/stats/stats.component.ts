/**
 * stats.component
 * getnative.org
 *
 * Created by henryehly on 2017/04/15.
 */

import { Component, Input } from '@angular/core';

import { Stats } from './stats';

@Component({
    selector: 'gn-stats',
    templateUrl: 'stats.component.html',
    styleUrls: ['stats.component.scss']
})
export class StatsComponent {

    @Input() stats: Stats;

}
