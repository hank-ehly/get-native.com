/**
 * app.routes
 * get-native.com
 *
 * Created by henryehly on 2016/11/08.
 */

import { Routes } from '@angular/router';

import { HomeRoutes } from './home/index';
import { PrivacyRoutes } from './privacy/index';
import { HelpRoutes } from './help/index';
import { TOSRoutes } from './tos/index';

export const routes: Routes = [
    ...HomeRoutes,
    ...PrivacyRoutes,
    ...HelpRoutes,
    ...TOSRoutes
];
