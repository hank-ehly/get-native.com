/**
 * match.directive
 * getnativelearning.com
 *
 * Created by henryehly on 2017/04/23.
 */

import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validators, Validator, ValidationErrors } from '@angular/forms';

import { Logger } from '../../core/logger/logger';
import { matchValidator } from './match-validator';

@Directive({
    selector: '[gnMatch]',
    providers: [{provide: NG_VALIDATORS, useExisting: MatchDirective, multi: true}]
})
export class MatchDirective implements Validator, OnChanges {
    @Input('gnMatch') selectors: string[];

    private valFn = Validators.nullValidator;

    constructor(private logger: Logger) {
        this.logger.debug(this, 'Init');
    }

    ngOnChanges(changes: SimpleChanges): void {
        const change = changes['selectors'];
        this.valFn = change ? matchValidator(change.currentValue) : Validators.nullValidator;
    }

    validate(c: AbstractControl): ValidationErrors|any {
        return this.valFn(c);
    }
}
