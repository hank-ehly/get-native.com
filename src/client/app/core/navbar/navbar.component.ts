import { Component } from '@angular/core';

import { Logger } from 'angular2-logger/core';
import { LoginService } from '../login/login.service';

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
