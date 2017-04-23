/**
 * match-validator
 * get-native.com
 *
 * Created by henryehly on 2017/04/23.
 */

import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

import * as _ from 'lodash';

export function matchValidator(selectors: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const name = control.value;
        const values = _.values(_.pick(name, selectors));
        return _.uniq(values).length === 1 ? null : {'match': {name}};
    };
}
