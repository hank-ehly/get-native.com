/**
 * transition.component
 * get-native.com
 *
 * Created by henryehly on 2016/12/12.
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Logger } from '../../core/logger/logger';

import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/take';
import * as _ from 'lodash';
import { NavbarService } from '../../core/navbar/navbar.service';

@Component({
    moduleId: module.id,
    selector: 'gn-transition',
    templateUrl: 'transition.component.html',
    styleUrls: ['transition.component.css']
})
export class TransitionComponent implements OnInit, OnDestroy {
    routeMap: any = {
        l:  'listening',
        s:  'speaking',
        sh: 'shadowing',
        w:  'writing'
    };

    count$ = new BehaviorSubject<number>(3);
    nextExercise: string;

    nextRoute: string;

    timer = IntervalObservable.create(1000).take(4);

    constructor(private logger: Logger, private route: ActivatedRoute, private router: Router, private navbar: NavbarService) {
        const routeCode = this.route.snapshot.queryParams['n'];
        this.nextRoute = '/study/' + this.routeMap[routeCode];

        this.nextExercise = _.toUpper(this.routeMap[routeCode]);
    }

    ngOnInit(): void {
        this.logger.debug(this, 'OnInit');
        this.timer.subscribe(this.onNext.bind(this), this.onError.bind(this), this.onComplete.bind(this));
        this.navbar.progressBarVisible$.next(true);
    }

    ngOnDestroy(): void {
        this.logger.debug(this, 'OnDestroy');
    }

    onNext(x: number): void {
        this.logger.debug(this, 'onNext', x);
        const nextCount = this.count$.getValue() - 1;

        if (_.gte(nextCount, 0)) {
            this.count$.next(nextCount);
        }
    }

    onError(): void {
        this.logger.debug(this, 'onError');
    }

    onComplete(): void {
        this.logger.debug(this, 'onComplete');
        // this.router.navigate([this.nextRoute], {
        //     queryParams: {
        //         v: this.route.snapshot.queryParams['v']
        //     }
        // }).then(() => {
        //     this.logger.debug(this, 'navigate complete');
        // });
    }
}
