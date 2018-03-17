/**
 * user
 * getnative.org
 *
 * Created by henryehly on 2017/01/15.
 */

import { Entity } from './entity';
import { Language } from '../typings/language';

export interface User extends Entity {
    picture_url?: string;
    is_silhouette_picture?: boolean;
    email?: string;
    email_verified?: boolean;
    email_notifications_enabled?: boolean;
    browser_notifications_enabled?: boolean;
    default_study_language?: Language;
    interface_language?: Language;
}
