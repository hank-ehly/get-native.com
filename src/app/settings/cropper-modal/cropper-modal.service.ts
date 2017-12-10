/**
 * cropper-modal.service
 * getnativelearning.com
 *
 * Created by henryehly on 2017/12/10.
 */

import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CropperModalService {

    data: any = {};
    closeEmitted: Observable<void>;
    cancelEmitted: Observable<void>;
    resetEmitted: Observable<void>;
    setImageEmitted: Observable<any>;
    applyEmitted: Observable<any>;
    private closeSource: Subject<void>;
    private cancelSource: Subject<void>;
    private resetSource: Subject<void>;
    private setImageSource: Subject<any>;
    private applySource: Subject<any>;

    constructor() {
        this.closeSource = new Subject<void>();
        this.cancelSource = new Subject<void>();
        this.resetSource = new Subject<void>();
        this.setImageSource = new Subject<void>();
        this.applySource = new Subject<void>();
        this.closeEmitted = this.closeSource.asObservable();
        this.cancelEmitted = this.cancelSource.asObservable();
        this.resetEmitted = this.resetSource.asObservable();
        this.setImageEmitted = this.setImageSource.asObservable();
        this.applyEmitted = this.applySource.asObservable();
    }

    setImage(image: any): void {
        this.setImageSource.next(image);
    }

    reset(): void {
        this.resetSource.next();
    }

    close(): void {
        this.closeSource.next();
    }

    cancel(): void {
        this.cancelSource.next();
    }

    apply(): void {
        this.applySource.next();
    }

}
