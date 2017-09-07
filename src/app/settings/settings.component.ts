/**
 * settings.component
 * getnativelearning.com
 *
 * Created by henryehly on 2016/12/09.
 */

import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../core/user/user.service';
import { Logger } from '../core/logger/logger';
import { User } from '../core/entities/user';

import { CropperSettings, ImageCropperComponent } from 'ng2-img-cropper';
import * as _ from 'lodash';

@Component({
    selector: 'gn-settings',
    templateUrl: 'settings.component.html',
    styleUrls: ['settings.component.scss']
})
export class SettingsComponent implements OnInit {

    @ViewChild(ImageCropperComponent) cropper: ImageCropperComponent;
    data: any = {};
    image: any;
    isCropperModalVisible = false;
    isThumbnailDropdownVisible = false;
    selectedTab: string;

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

    user: User = this.userService.current$.getValue();

    constructor(private logger: Logger, private router: Router, private userService: UserService) {
    }

    ngOnInit() {
        this.logger.debug(this, 'ngOnInit');
        this.selectedTab = this.getSelectedTab();
    }

    onClickThumbnail(): void {
        this.isThumbnailDropdownVisible = !this.isThumbnailDropdownVisible;
    }

    onChangeThumbnail(e: Event): void {
        this.isThumbnailDropdownVisible = false;
        this.isCropperModalVisible = true;
        this.image = new Image();
        const file: File = _.first((<HTMLInputElement>e.target).files);
        const reader = new FileReader();
        reader.onloadend = this.onLoadEnd.bind(this);
        reader.readAsDataURL(file);
    }

    onClickRemovePhoto(): void {
        if (this.image) {
            this.cropper.reset();
            this.isThumbnailDropdownVisible = false;
        } else if (this.user.is_silhouette_picture) {
            this.isThumbnailDropdownVisible = false;
        } else {
            // API request
        }
    }

    onClickCancelUpload(): void {
        this.cropper.reset();
    }

    onClickUpload(): void {
        //
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
        this.image = this.image;
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
}
