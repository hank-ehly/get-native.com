/**
 * category-list.component
 * get-native.com
 *
 * Created by henryehly on 2017/01/12.
 */

import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';

import { Category } from '../../core/entities/category';
import { Logger } from '../../core/logger/logger';
import { Categories } from '../../core/entities/categories';
import { CategoryListService } from '../../core/category-list/category-list.service';
import { Subcategory } from '../../core/entities/subcategory';

import * as _ from 'lodash';

@Component({
    moduleId: module.id,
    selector: 'gn-category-list',
    templateUrl: 'category-list.component.html',
    styleUrls: ['category-list.component.css']
})
export class CategoryListComponent implements OnInit, OnChanges {
    @Input() categories: Categories;
    rows: Category[][];

    constructor(private logger: Logger, private service: CategoryListService) {
    }

    ngOnInit(): void {
        this.logger.debug(this, 'OnInit()');
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['categories'] && changes['categories'].currentValue) {
            this.onCategoriesChange(<Categories>changes['categories'].currentValue);
        }
    }

    onCategoriesChange(categories: Categories): void {
        const rowSize    = 3;
        const unfilled   =  rowSize - (categories.count % rowSize);
        const filledRows = _.concat(categories.records, _.times(unfilled, _.constant({})));

        this.rows = _.chunk(filledRows, rowSize);
        this.logger.debug(this, 'onCategoriesChange()', this.rows);
    }

    onClickCategory(category: Category): void {
        this.logger.debug(this, 'onClickCategory()', category);
        this.service.selectCategory(category);
    }

    onClickSubcategory(subcategory: Subcategory): void {
        this.logger.debug(this, 'onClickSubcategory()', subcategory);
        this.service.selectSubcategory(subcategory);
    }
}
