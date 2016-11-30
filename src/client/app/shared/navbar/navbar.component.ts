import { Component } from '@angular/core';

import { LoginService } from '../../core/index';

import { Logger } from 'angular2-logger/core';

@Component({
    moduleId: module.id,
    selector: 'gn-navbar',
    templateUrl: 'navbar.component.html',
    styleUrls: ['navbar.component.css']
})

export class NavbarComponent {
    authenticated: boolean = false;

    constructor(private loginService: LoginService, private logger: Logger) {
    }

    onShowLoginModal(event: any): void {
        this.logger.debug('[NavbarComponent]: requestShowLoginModal()');
        event.preventDefault();
        this.loginService.showModal();
    }
}
