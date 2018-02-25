// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    staging: true,
    development: false,
    name: 'staging',
    apiBaseUrl: 'http://api.stg.getnativelearning.com',
    facebookLoginUrl: 'http://api.stg.getnativelearning.com/oauth/facebook',
    twitterLoginUrl: 'http://api.stg.getnativelearning.com/oauth/twitter',
    googleLoginUrl: 'http://api.stg.getnativelearning.com/oauth/google',
    facebookAppId: '215585938915345',
    googleStorageUrl: 'http://storage.googleapis.com/stg.getnativelearning.com'
};
