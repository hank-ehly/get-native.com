/**
 * stubs
 * getnative.org
 *
 * Created by henryehly on 2016/11/23.
 */

import { NavigationExtras, Router } from '@angular/router';

export const STUBPasswords = {
    veryWeak: 'very weak',
    weak: 'we@k',
    good: 'go0D12',
    strong: 'sTr0nG12',
    veryStrong: 'very_sTr0nG12'
};

export const STUBRouter = <Router>{
    navigate(commands: any[], extras?: NavigationExtras): Promise<boolean> {
        return null;
    }
};

export const STUBCategories = [
    {title: 'Business',     subcategories: ['Subcategory 1', 'Subcategory 2', 'Subcategory 3', 'Subcategory 4']},
    {title: 'Holidays',     subcategories: ['Subcategory 1', 'Subcategory 2', 'Subcategory 3']},
    {title: 'Negotiations', subcategories: ['Subcategory 1', 'Subcategory 2']},
    {title: 'Language',     subcategories: ['Subcategory 1', 'Subcategory 2']},
    {title: 'Hobbies',      subcategories: ['Subcategory 1', 'Subcategory 2', 'Subcategory 3', 'Subcategory 4', 'Subcategory 5']},
    {title: 'Travel',       subcategories: ['Subcategory 1', 'Subcategory 2']},
    {title: 'Sports',       subcategories: ['Subcategory 1']}
];
