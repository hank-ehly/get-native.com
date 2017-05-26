/**
 * stg
 * get-native.com
 *
 * Created by henryehly on 2017/01/19.
 */

import { EnvConfig } from './env-config.interface';

const StgConfig: EnvConfig = {
    API: 'https://api.stg.get-native.com',
    ENV: 'STAGING',
    FacebookLoginUrl: 'https://api.stg.get-native.com/oauth/facebook',
    TwitterLoginUrl: 'https://api.stg.get-native.com/oauth/twitter',
    GoogleLoginUrl: 'https://api.stg.get-native.com/oauth/google'
};

export = StgConfig;
