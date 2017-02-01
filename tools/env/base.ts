import { EnvConfig } from './env-config.interface';

const BaseConfig: EnvConfig = {
    moderator: 'getnative.moderator@gmail.com',

    /* From HTML5 Specification */
    EMAIL_REGEX: '[a-z0-9!#$%&\'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*'
};

export = BaseConfig;

