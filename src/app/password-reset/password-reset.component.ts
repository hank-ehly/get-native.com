import { Component, OnInit } from '@angular/core';

import { Logger } from '../core/logger/logger';
import { ActivatedRoute } from '@angular/router';
import { APIError } from '../core/http/api-error';

@Component({
    selector: 'gn-password-reset',
    templateUrl: './password-reset.component.html',
    styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

    token: string;
    model = {password: '', confirm: ''};
    error: APIError;

    constructor(private logger: Logger, private route: ActivatedRoute) {
        this.token = this.route.snapshot.data['token'];
        this.error = {
            message: 'Bad value in the thingy!',
            code: 'bad foo'
        };
    }

    ngOnInit() {
        this.logger.debug(this, 'OnInit', this.token);
    }

    onSubmit(): void {
        this.logger.debug(this, 'OnSubmit');
    }

}
