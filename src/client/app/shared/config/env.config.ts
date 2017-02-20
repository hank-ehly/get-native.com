/**
 * env.config
 * get-native.com
 *
 * Created by henryehly on 2016/11/13.
 */

export interface EnvConfig {
    API?: string;
    ENV?: string;
    moderator?: string;
    facebookAppId?: string;
    facebookSDKSrc?: string;
}

export const Config: EnvConfig = JSON.parse('<%= ENV_CONFIG %>');
