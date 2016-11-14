import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'gn-navbar',
    templateUrl: 'navbar.component.html',
    styleUrls: ['navbar.component.css']
})

export class NavbarComponent {
    @Output() didRequestShowLoginModal = new EventEmitter();
    onClickSignIn(e: any): void {
        e.preventDefault();
        console.log('[NavbarComponent]: requestShowLoginModal()');
        this.didRequestShowLoginModal.emit();
    }
}
