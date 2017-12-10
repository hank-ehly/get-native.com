/**
 * settings.component
 * getnativelearning.com
 *
 * Created by henryehly on 2016/12/09.
 */

import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../core/user/user.service';
import { Logger } from '../core/logger/logger';
import { User } from '../core/entities/user';

import * as _ from 'lodash';
import { HttpService } from '../core/http/http.service';
import { APIHandle } from '../core/http/api-handle';
import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';
import { APIErrors } from '../core/http/api-error';
import { ImageService } from '../core/image.service';
import { CropperModalComponent } from './cropper-modal/cropper-modal.component';
import { CropperModalService } from './cropper-modal/cropper-modal.service';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal/bs-modal.service';

@Component({
    selector: 'gn-settings',
    templateUrl: 'settings.component.html',
    styleUrls: ['settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {

    OnDestroy$ = new Subject<void>();
    data = this.cropperModalService.data;
    image: any;
    selectedTab: string;
    imageFile: File;
    isThumbnailDropdownVisible = false;
    bsModalRef: BsModalRef;

    // half of main width - half of dropdown width
    dropdownLeft = 300 - (220 / 2) + 'px';
    dropdownTop = '-30px';

    flags = {
        processing: {
            deleteProfileImage: false,
            uploadProfileImage: false
        }
    };

    pictureUrl$ = this.userService.current$.pluck('picture_url');
    isSilhouettePicture$ = this.userService.current$.pluck('is_silhouette_picture');

    constructor(private logger: Logger, private router: Router, private userService: UserService, private http: HttpService,
                private imageService: ImageService, private modalService: BsModalService,
                private cropperModalService: CropperModalService) {
    }

    ngOnInit() {
        this.logger.debug(this, 'ngOnInit');
        this.selectedTab = this.getSelectedTab();
        this.cropperModalService.closeEmitted.takeUntil(this.OnDestroy$).subscribe(this.onCloseModal.bind(this));
        this.cropperModalService.cancelEmitted.takeUntil(this.OnDestroy$).subscribe(this.onCancelCrop.bind(this));
        this.cropperModalService.applyEmitted.takeUntil(this.OnDestroy$).subscribe(this.onApplyCrop.bind(this));
    }

    ngOnDestroy(): void {
        this.logger.debug(this, 'OnDestroy');
        this.OnDestroy$.next();
    }

    onClickThumbnail(): void {
        this.logger.debug(this, 'onClickThumbnail');
        this.isThumbnailDropdownVisible = true;
    }

    onChangeThumbnail(e: Event): void {
        this.isThumbnailDropdownVisible = false;
        this.bsModalRef = this.modalService.show(CropperModalComponent);
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
        this.logger.debug(this, 'onClickCancelUpload');
        this.data.image = null;
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

    onCloseModal(): void {
        this.bsModalRef.hide();
    }

    onClickCancelDropdown(): void {
        this.logger.debug(this, 'onClickCancelDropdown');
        this.cropperModalService.reset();
        this.isThumbnailDropdownVisible = false;
    }

    onCancelCrop(): void {
        this.cropperModalService.reset();
        this.bsModalRef.hide();
    }

    onApplyCrop(): void {
        this.isThumbnailDropdownVisible = false;
        this.bsModalRef.hide();
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
        this.cropperModalService.setImage(this.image);
    }

    private onUploadProfileImageSuccess(user: User): void {
        this.flags.processing.uploadProfileImage = false;
        _.assign(user, {is_silhouette_picture: false});
        this.userService.update(user);
        this.cropperModalService.reset();
        this.data.image = null;
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
