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
import { APIErrors } from '../core/http/api-error';
import { ImageService } from '../core/image.service';

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
    dropdownTop = '-30px';

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

    flags = {
        processing: {
            deleteProfileImage: false,
            uploadProfileImage: false
        }
    };

    pictureUrl$ = this.userService.current$.pluck('picture_url');
    isSilhouettePicture$ = this.userService.current$.pluck('is_silhouette_picture');

    constructor(private logger: Logger, private router: Router, private userService: UserService, private http: HttpService,
                private imageService: ImageService) {
    }

    ngOnInit() {
        this.logger.debug(this, 'ngOnInit');
        this.selectedTab = this.getSelectedTab();
    }

    ngOnDestroy(): void {
        this.logger.debug(this, 'OnDestroy');
        this.OnDestroy$.next();
    }

    onClickThumbnail($event: MouseEvent): void {
        if ((<HTMLElement>$event.target).hasAttribute('dropdown')) {
            this.logger.debug(this, 'onClickThumbnail');
            $event.preventDefault();
            $event.stopPropagation();
            this.isThumbnailDropdownVisible = !this.isThumbnailDropdownVisible;
        }
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
        if (this.flags.processing.deleteProfileImage || this.flags.processing.uploadProfileImage ||
            this.userService.current$.getValue().is_silhouette_picture) {
            return;
        }

        this.flags.processing.deleteProfileImage = true;
        this.http.request(APIHandle.DELETE_PROFILE_IMAGE)
            .takeUntil(this.OnDestroy$)
            .subscribe(
                this.onDeleteProfileImageSuccess.bind(this),
                this.onDeleteProfileImageError.bind(this)
            );
    }

    onClickCancelUpload(): void {
        this.cropper.reset();
    }

    onClickUpload(): void {
        const formData = new FormData();
        const blob = this.imageService.convertDataURIToBlob(this.data.image);
        formData.append('image', blob);
        this.flags.processing.uploadProfileImage = true;
        this.http.request(APIHandle.UPLOAD_PROFILE_IMAGE, {body: formData})
            .takeUntil(this.OnDestroy$)
            .subscribe(
                this.onUploadProfileImageSuccess.bind(this),
                this.onUploadProfileImageError.bind(this)
            );
    }

    onClickCancelDropdown($event: MouseEvent): void {
        this.logger.debug(this, 'onClickCancelDropdown');
        $event.preventDefault();
        $event.stopPropagation();
        this.cropper.reset();
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
        this.cropper.reset();
        this.flags.processing.uploadProfileImage = false;
        _.assign(user, {is_silhouette_picture: false});
        this.userService.update(user);
        this.cropper.reset();
    }

    private onUploadProfileImageError(e: APIErrors): void {
        this.logger.debug(this, 'onUploadProfileImageError', e);
        this.flags.processing.uploadProfileImage = false;
    }

    private onDeleteProfileImageSuccess(): void {
        this.flags.processing.deleteProfileImage = false;
        this.isThumbnailDropdownVisible = false;
        this.userService.update({is_silhouette_picture: true});
    }

    private onDeleteProfileImageError(e: APIErrors): void {
        this.logger.debug(this, 'onDeleteProfileImageError', e);
        this.flags.processing.deleteProfileImage = false;
    }

}
