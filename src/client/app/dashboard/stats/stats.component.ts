/**
 * stats.component
 * get-native.com
 *
 * Created by henryehly on 2017/04/15.
 */

import { Component, Input } from '@angular/core';

import { Stats } from './stats';

@Component({
    moduleId: module.id,
    selector: 'gn-stats',
    templateUrl: 'stats.component.html',
    styleUrls: ['stats.component.css']
})
export class StatsComponent {
    @Input() stats: Stats;
}
