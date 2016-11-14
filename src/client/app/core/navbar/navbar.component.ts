import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'gn-navbar',
    templateUrl: 'navbar.component.html',
    styleUrls: ['navbar.component.css']
})

export class NavbarComponent {
    @Output() didRequestShowLoginModal = new EventEmitter();
    requestShowLoginModal(): void {
        console.log('[NavbarComponent]: requestShowLoginModal()');
        this.didRequestShowLoginModal.emit();
    }
}
