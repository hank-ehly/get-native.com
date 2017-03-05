/**
 * category-list.service
 * get-native.com
 *
 * Created by henryehly on 2017/02/05.
 */

import { Injectable } from '@angular/core';

import { Logger, Subcategory, Category } from '../index';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CategoryListService {
    selectCategory$: Observable<Category>;
    selectSubcategory$: Observable<Subcategory>;

    private selectCategorySource: Subject<Category>;
    private selectSubcategorySource: Subject<Subcategory>;

    constructor(private logger: Logger) {
        this.selectCategorySource = new Subject<Category>();
        this.selectSubcategorySource = new Subject<Subcategory>();

        this.selectCategory$ = this.selectCategorySource.asObservable();
        this.selectSubcategory$ = this.selectSubcategorySource.asObservable();
    }

    selectCategory(category: Category): void {
        this.logger.debug(this, `Selected '${category.name}' category.`);
        this.selectCategorySource.next(category);
    }

    selectSubcategory(subcategory: Subcategory): void {
        this.logger.debug(this, `Selected '${subcategory.name}' subcategory.`);
        this.selectSubcategorySource.next(subcategory);
    }
}
