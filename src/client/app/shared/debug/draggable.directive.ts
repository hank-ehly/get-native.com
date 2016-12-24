/**
 * draggable.directive
 * get-native.com
 *
 * Created by henryehly on 2016/12/24.
 */

import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';

import { LocalStorageService, kDebugModalPosition } from '../../core/index';
import { Coordinate } from './coordinate';

import { Logger } from 'angular2-logger/core';

@Directive({
    selector: '[gnDraggable]'
})
export class DraggableDirective implements OnInit {
    dragging: boolean;
    x: number;
    y: number;

    constructor(private el: ElementRef, private logger: Logger, private localStorage: LocalStorageService) {
        this.dragging = false;
        this.x = 0;
        this.y = 0;
    }

    ngOnInit(): void {
        if (this.localStorage.hasItem(kDebugModalPosition)) {
            this.coordinate = this.localStorage.getItem(kDebugModalPosition);
        }
    }

    set coordinate(c: Coordinate) {
        this.el.nativeElement.style.left = c.x + 'px';
        this.el.nativeElement.style.top = c.y + 'px';
    }

    @HostListener('mousedown', ['$event']) onMouseDown(e: MouseEvent): void {
        this.dragging = true;
        this.x = e.clientX - this.el.nativeElement.offsetLeft;
        this.y = e.clientY - this.el.nativeElement.offsetTop;
    }

    @HostListener('mouseup', ['$event']) onMouseUp(e: MouseEvent): void {
        this.dragging = false;
    }

    @HostListener('mouseleave', ['$event']) onMouseLeave(e: MouseEvent): void {
        this.dragging = false;
    }

    @HostListener('mousemove', ['$event']) onMouseMove(e: MouseEvent): void {
        if (!this.dragging) {
            return;
        }

        this.updatePositionForMouseEvent(e);
    }

    updatePositionForMouseEvent(e: MouseEvent): void {
        let x = (e.clientX - this.x);
        let y = (e.clientY - this.y);

        if (x < 0) x = 0;
        if (y < 0) y = 0;

        let coordinate = {x: x, y: y};

        this.coordinate = coordinate;
        this.localStorage.setItem(kDebugModalPosition, coordinate);
    }
}
