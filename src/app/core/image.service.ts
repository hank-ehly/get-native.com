import { Injectable } from '@angular/core';

@Injectable()
export class ImageService {

    constructor() {
    }

    convertDataURIToBlob(uri: string): Blob {
        const parts = uri.split(',');
        const type = parts[0].match(/([A-Za-z]+\/[A-Za-z]+)/)[0];
        const byteStr = atob(uri.split(',')[1]);
        const intArr = new Uint8Array(byteStr.length);

        for (let i = 0; i < byteStr.length; i++) {
            intArr[i] = byteStr.charCodeAt(i);
        }

        return new Blob([intArr], {type: type});
    }

}
