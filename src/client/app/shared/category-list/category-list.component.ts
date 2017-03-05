/**
 * category-list.component
 * get-native.com
 *
 * Created by henryehly on 2017/01/12.
 */

import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';

import { Logger, Categories, Category, Subcategory, CategoryListService } from '../../core/index';

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
        let chunkSize = 3;
        this.rows = categories.records.map((e, i) => {
            return i % chunkSize === 0 ? categories.records.slice(i, i + 3) : null;
        }).filter((e) => e);

        let surplus = categories.count % 3;
        if (surplus !== 0) {
            let spaceLeft = chunkSize - surplus;

            let i = 0;
            while (i < spaceLeft) {
                this.rows[this.rows.length - 1].push({});
                i++;
            }
        }

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
