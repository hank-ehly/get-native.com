/**
 * settings.component
 * getnativelearning.com
 *
 * Created by henryehly on 2016/12/09.
 */

import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../core/user/user.service';
import { Logger } from '../core/logger/logger';
import { User } from '../core/entities/user';

import { CropperSettings, ImageCropperComponent } from 'ng2-img-cropper';
import * as _ from 'lodash';
import { HttpService } from '../core/http/http.service';
import { APIHandle } from '../core/http/api-handle';
import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';

@Component({
    selector: 'gn-settings',
    templateUrl: 'settings.component.html',
    styleUrls: ['settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {

    @ViewChild(ImageCropperComponent) cropper: ImageCropperComponent;
    OnDestroy$ = new Subject<void>();
    data: any = {};
    image: any;
    isCropperModalVisible = false;
    isThumbnailDropdownVisible = false;
    selectedTab: string;
    imageFile: File;

    // half of main width - half of dropdown width
    dropdownLeft = 300 - (232 / 2) + 'px';
    dropdownTop = '80px';

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

    pictureUrl$ = this.userService.current$.pluck('picture_url');

    constructor(private logger: Logger, private router: Router, private userService: UserService, private http: HttpService) {
    }

    ngOnInit() {
        this.logger.debug(this, 'ngOnInit');
        this.selectedTab = this.getSelectedTab();
    }

    ngOnDestroy(): void {
        this.logger.debug(this, 'OnDestroy');
        this.OnDestroy$.next();
    }

    onClickThumbnail(): void {
        this.isThumbnailDropdownVisible = !this.isThumbnailDropdownVisible;
    }

    onChangeThumbnail(e: Event): void {
        this.isThumbnailDropdownVisible = false;
        this.isCropperModalVisible = true;
        this.image = new Image();
        this.imageFile = _.first((<HTMLInputElement>e.target).files);
        const reader = new FileReader();
        reader.onloadend = this.onLoadEnd.bind(this);
        reader.readAsDataURL(this.imageFile);
    }

    onClickRemovePhoto(): void {
        if (this.image) {
            this.cropper.reset();
            this.isThumbnailDropdownVisible = false;
        } else if (this.userService.current$.getValue().is_silhouette_picture) {
            this.isThumbnailDropdownVisible = false;
        } else {
            this.http.request(APIHandle.DELETE_PROFILE_IMAGE).takeUntil(this.OnDestroy$).subscribe(
                (x: any) => {
                    this.logger.debug(this, 'SUCCESS', x);
                },
                (e: any) => {
                    this.logger.debug(this, 'ERROR', e);
                }
            );
        }
    }

    onClickCancelUpload(): void {
        this.cropper.reset();
    }

    onClickUpload(): void {
        const formData = new FormData();
        formData.append('image', this.imageFile, this.imageFile.name);
        this.http.request(APIHandle.UPLOAD_PROFILE_IMAGE, {body: formData}).takeUntil(this.OnDestroy$).subscribe(
            this.onUploadProfileImageSuccess.bind(this),
            this.onUploadProfileImageError.bind(this)
        );
    }

    onClickCancelDropdown(): void {
        this.isThumbnailDropdownVisible = false;
    }

    onClickCancelCrop(): void {
        this.cropper.reset();
        this.isCropperModalVisible = false;
    }

    onClickApplyCrop(): void {
        this.isCropperModalVisible = false;
    }

    setSelectedTab(tab: string) {
        this.selectedTab = tab;
    }

    getSelectedTab(): string {
        if (this.selectedTab) {
            return this.selectedTab;
        }

        let tabValue = 'general';
        if (_.includes(this.router.url, 'security')) {
            tabValue = 'security';
        } else if (_.includes(this.router.url, 'notifications')) {
            tabValue = 'notifications';
        } else if (_.includes(this.router.url, 'activity')) {
            tabValue = 'activity';
        }

        return tabValue;
    }

    private onLoadEnd(e: any): void {
        this.image.src = e.target.result;
        this.cropper.setImage(this.image);
    }

    private onUploadProfileImageSuccess(user: User): void {
        _.assign(user, {is_silhouette_picture: false});
        this.userService.updateCache(user);
        this.cropper.reset();
    }

    private onUploadProfileImageError(e: any): void {
        this.logger.debug(this, 'ERROR', e);
    }
}
