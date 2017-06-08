/**
 * local-storage-keys
 * get-native.com
 *
 * Created by henryehly on 2016/11/20.
 */

import { environment } from '../../../environments/environment';

export const kAcceptLocalStorage  = environment.production ? 'FCjKY3' : 'accept-local-storage' ;
export const kDebugModalPosition  = environment.production ? 'x2UeqU' : 'debug-modal-position' ;
export const kAuthToken           = environment.production ? '2C9q5J' : 'auth-token'           ;
export const kAuthTokenExpire     = environment.production ? 'Jj35Bv' : 'auth-token-expire'    ;
export const kCurrentUser         = environment.production ? 'QLSxY4' : 'current-user'         ;
export const kCurrentStudySession = environment.production ? '6Hj0pQ' : 'current-study-session';
