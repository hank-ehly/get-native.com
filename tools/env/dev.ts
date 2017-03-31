import { EnvConfig } from './env-config.interface';
import Config from '../config';

const DevConfig: EnvConfig = {
    API: 'http://localhost:' + Config.API_PORT,
    ENV: 'DEV',
    facebookAppId: '215586025582003',
    facebookSDKSrc: '//connect.facebook.net/en_US/sdk/debug.js'
};

export = DevConfig;
