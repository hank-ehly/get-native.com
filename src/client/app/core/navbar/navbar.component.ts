import { Component } from '@angular/core';

import { Logger } from 'angular2-logger/core';
import { LoginModalService } from '../login-modal/login-modal.service';

@Component({
    moduleId: module.id,
    selector: 'gn-navbar',
    templateUrl: 'navbar.component.html',
    styleUrls: ['navbar.component.css']
})

export class NavbarComponent {
    constructor(private loginModalService: LoginModalService, private logger: Logger) {
    }

    onShowLoginModal(event: any): void {
        this.logger.debug('[NavbarComponent]: requestShowLoginModal()');
        event.preventDefault();
        this.loginModalService.showModal();
    }
}
