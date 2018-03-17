/**
 * local-storage-keys
 * getnative.org
 *
 * Created by henryehly on 2016/11/20.
 */

import { environment } from '../../../environments/environment';

export const kAcceptLocalStorage = environment.production ? 'FCjKY3' : 'accept_local_storage';
export const kAuthToken = environment.production ? '2C9q5J' : 'auth_token';
export const kAuthTokenExpire = environment.production ? 'Jj35Bv' : 'auth_token_expire';
export const kCurrentUser = environment.production ? 'QLSxY4' : 'current_user';
export const kCurrentStudySession = environment.production ? '6Hj0pQ' : 'current_study_session';
export const kCurrentStudyLanguage = environment.production ? 'p3bkA0' : 'current_study_language';
