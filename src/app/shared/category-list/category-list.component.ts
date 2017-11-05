/**
 * category-list.component
 * getnativelearning.com
 *
 * Created by henryehly on 2017/01/12.
 */

import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, OnDestroy } from '@angular/core';

import { Subcategory } from '../../core/entities/subcategory';
import { Category } from '../../core/entities/category';
import { Entities } from '../../core/entities/entities';
import { Logger } from '../../core/logger/logger';

import { Subject } from 'rxjs/Subject';
import * as _ from 'lodash';

@Component({
    selector: 'gn-category-list',
    templateUrl: 'category-list.component.html',
    styleUrls: ['category-list.component.scss']
})
export class CategoryListComponent implements OnInit, OnChanges, OnDestroy {

    @Input() categories: Entities<Category>;

    @Output() category$    = new Subject<Category>();
    @Output() subcategory$ = new Subject<Subcategory>();

    rows: Category[][];

    constructor(private logger: Logger) {
    }

    ngOnInit(): void {
        this.logger.debug(this, 'OnInit()');
    }

    ngOnDestroy(): void {
        this.logger.debug(this, 'OnDestroy()');
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['categories'] && changes['categories'].currentValue) {
            this.onCategoriesChange(<Entities<Category>>changes['categories'].currentValue);
        }
    }

    onCategoriesChange(categories: Entities<Category>): void {
        const rowSize    = 3;
        const unfilled   =  rowSize - (categories.count % rowSize);
        const filledRows = _.concat(categories.records, _.times(unfilled, _.constant({})));

        this.rows = _.chunk(filledRows, rowSize);
        this.logger.debug(this, 'onCategoriesChange()', this.rows);
    }

}
