import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { CropperSettings, ImageCropperComponent } from 'ng2-img-cropper';
import * as _ from 'lodash';
import { CropperModalService } from './cropper-modal.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Logger } from '../../core/logger/logger';

@Component({
    selector: 'gn-cropper-modal',
    templateUrl: './cropper-modal.component.html',
    styleUrls: ['./cropper-modal.component.scss']
})
export class CropperModalComponent implements OnInit, OnDestroy, AfterViewInit {

    @ViewChild(ImageCropperComponent) cropper: ImageCropperComponent;

    data = this.cropperModalService.data;

    cropperSettings: CropperSettings = _.assign(new CropperSettings(), {
        width: 110,
        height: 110,
        croppedWidth: 110,
        croppedHeight: 110,
        minWidth: 110,
        minHeight: 110,
        canvasWidth: 400,
        canvasHeight: 300,
        fileType: 'image/jpeg',
        cropperDrawSettings: {
            strokeWidth: 2,
            strokeColor: '#FFFFFF',
            dragIconStrokeWidth: 1,
            dragIconStrokeColor: '#FFFFFF',
            dragIconFillColor: '#FFFFFF'
        },
        rounded: false,
        noFileInput: true,
        keepAspect: true,
        cropperClass: 'canvas',
        croppingClass: 'canvas--populated'
    });
    private OnDestroy$ = new Subject<void>();

    constructor(private cropperModalService: CropperModalService, private logger: Logger) {
    }

    ngOnInit(): void {
        this.logger.debug(this, 'OnInit');
    }

    ngOnDestroy(): void {
        this.logger.debug(this, 'OnDestroy');
        this.OnDestroy$.next();
    }

    ngAfterViewInit(): void {
        this.cropperModalService.resetEmitted.takeUntil(this.OnDestroy$).subscribe(this.reset.bind(this));
        this.cropperModalService.setImageEmitted.takeUntil(this.OnDestroy$).subscribe(this.setImage.bind(this));
    }

    reset(): void {
        this.logger.debug(this, 'reset');
        this.cropper.reset();
    }

    setImage(image: any): void {
        this.cropper.setImage(image);
    }

    onCloseModal(): void {
        this.cropperModalService.cancel();
    }

    onClickCancelCrop(): void {
        this.cropperModalService.cancel();
    }

    onClickApplyCrop(): void {
        this.cropperModalService.apply();
    }

}
