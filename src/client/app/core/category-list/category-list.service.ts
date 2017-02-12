/**
 * category-list.service
 * get-native.com
 *
 * Created by henryehly on 2017/02/05.
 */

import { Injectable } from '@angular/core';

import { Logger, Topic, Category } from '../index';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CategoryListService {
    selectCategory$: Observable<Category>;
    selectTopic$: Observable<Topic>;

    private selectCategorySource: Subject<Category>;
    private selectTopicSource: Subject<Topic>;

    constructor(private logger: Logger) {
        this.selectCategorySource = new Subject<Category>();
        this.selectTopicSource = new Subject<Topic>();

        this.selectCategory$ = this.selectCategorySource.asObservable();
        this.selectTopic$ = this.selectTopicSource.asObservable();
    }

    selectCategory(category: Category): void {
        this.logger.debug(this, `Selected '${category.name}' category.`);
        this.selectCategorySource.next(category);
    }

    selectTopic(topic: Topic): void {
        this.logger.debug(this, `Selected '${topic.name}' topic.`);
        this.selectTopicSource.next(topic);
    }
}
