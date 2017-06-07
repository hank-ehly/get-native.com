/**
 * local-storage-keys
 * get-native.com
 *
 * Created by henryehly on 2016/11/20.
 */

import { Config } from '../../shared/config/env.config';

export const kAcceptLocalStorage  = Config.ENV === 'DEV' ? 'accept-local-storage'  : 'FCjKY3';
export const kDebugModalPosition  = Config.ENV === 'DEV' ? 'debug-modal-position'  : 'x2UeqU';
export const kAuthToken           = Config.ENV === 'DEV' ? 'auth-token'            : '2C9q5J';
export const kAuthTokenExpire     = Config.ENV === 'DEV' ? 'auth-token-expire'     : 'Jj35Bv';
export const kCurrentUser         = Config.ENV === 'DEV' ? 'current-user'          : 'QLSxY4';
export const kCurrentStudySession = Config.ENV === 'DEV' ? 'current-study-session' : '6Hj0pQ';
