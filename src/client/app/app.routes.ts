import { Routes } from '@angular/router';

import { HomeRoutes } from './home/home.routes';
import { PrivacyPolicyRoutes } from './privacy-policy/privacy-policy.routes';

export const routes: Routes = [
    ...HomeRoutes,
    ...PrivacyPolicyRoutes
];
