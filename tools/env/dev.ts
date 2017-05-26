import { EnvConfig } from './env-config.interface';
import Config from '../config';

const DevConfig: EnvConfig = {
    API: 'http://localhost:' + Config.API_PORT,
    ENV: 'DEV',
    FacebookLoginUrl: 'http://localhost:3000/oauth/facebook',
    TwitterLoginUrl: 'http://localhost:3000/oauth/twitter',
    GoogleLoginUrl: 'http://localhost:3000/oauth/google'
};

export = DevConfig;
