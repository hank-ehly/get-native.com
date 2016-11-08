import { Routes } from '@angular/router';

import { HomeRoutes } from './home/index';
import { PrivacyPolicyRoutes } from './privacy-policy/index';
import { HelpRoutes } from './help/index';

export const routes: Routes = [
    ...HomeRoutes,
    ...PrivacyPolicyRoutes,
    ...HelpRoutes
];
