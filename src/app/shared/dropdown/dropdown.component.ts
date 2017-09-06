import { Component, Input } from '@angular/core';

@Component({
    selector: 'gn-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent {

    @Input() left: string;
    @Input() top: string;

}
