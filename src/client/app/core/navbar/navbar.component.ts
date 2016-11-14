import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'gn-navbar',
    templateUrl: 'navbar.component.html',
    styleUrls: ['navbar.component.css']
})

export class NavbarComponent {
    @Output() showSignInModal = new EventEmitter<any>();

    onShowSignInModal(event: any): void {
        console.log('[NavbarComponent]: requestShowLoginModal()'); // TODO: Logger service
        event.preventDefault();
        this.showSignInModal.emit();
    }
}
