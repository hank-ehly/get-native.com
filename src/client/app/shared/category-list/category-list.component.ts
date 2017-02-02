/**
 * category-list.component
 * get-native.com
 *
 * Created by henryehly on 2017/01/12.
 */

import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';

import { Logger, Categories, Category, Topic } from '../../core/index';

@Component({
    moduleId: module.id,
    selector: 'gn-category-list',
    templateUrl: 'category-list.component.html',
    styleUrls: ['category-list.component.css']
})
export class CategoryListComponent implements OnInit, OnChanges {
    @Input() categories: Categories;
    @Output() selectCategory: EventEmitter<Category>;
    @Output() selectTopic: EventEmitter<Topic>;
    rows: Category[][];

    constructor(private logger: Logger) {
        this.selectCategory = new EventEmitter<Category>();
        this.selectTopic    = new EventEmitter<Topic>();
    }

    ngOnInit(): void {
        this.logger.debug(`[${this.constructor.name}] OnInit()`);
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

        this.logger.debug(`[${this.constructor.name}]: Category Rows: `, this.rows);
    }

    onClickCategory(category: Category): void {
        this.logger.debug(`[${this.constructor.name}] onClickCategory`, category);
        this.selectCategory.emit(category);
    }

    onClickTopic(topic: Topic): void {
        this.logger.debug(`[${this.constructor.name}] onClickTopic`, topic);
        this.selectTopic.emit(topic);
    }
}
