/**
 * footer.component
 * get-native.com
 *
 * Created by henryehly on 2016/11/06.
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'gn-footer',
    templateUrl: 'footer.component.html',
    styleUrls: ['footer.component.css']
})

export class FooterComponent implements OnInit {
    constructor(private router: Router) {
    }

    ngOnInit(): void {
        this.router.events.subscribe(() => {
            window.scrollTo(0, 0);
        });
    }
}
