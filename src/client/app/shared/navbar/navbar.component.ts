import { Component, OnInit, Input } from '@angular/core';

import { LoginService, NavbarService } from '../../core/index';

import { Logger } from 'angular2-logger/core';

@Component({
    moduleId: module.id,
    selector: 'gn-navbar',
    templateUrl: 'navbar.component.html',
    styleUrls: ['navbar.component.css']
})

export class NavbarComponent implements OnInit {
    @Input() authenticated: boolean;
    title: string;
    logoLinkPath: string;

    constructor(private loginService: LoginService,
                private logger: Logger,
                private navbarService: NavbarService) {
    }

    ngOnInit(): void {
        this.navbarService.setTitle$.subscribe((title) => this.title = title);
        this.logoLinkPath = this.authenticated ? 'dashboard' : '';
    }

    onShowLoginModal(event: any): void {
        this.logger.debug('[NavbarComponent]: requestShowLoginModal()');
        event.preventDefault();
        this.loginService.showModal();
    }
}
