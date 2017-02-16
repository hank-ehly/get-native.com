const currentDir = '/var/www/get-native.com/current';
const logDir     = '/var/log';

module.exports = {
    apps: [
        {
            name: 'api.dev',
            script: './src/server',
            error_file: './logs/api.dev.err.log',
            out_file: './logs/api.dev.out.log',
            exec_mode: 'cluster',
            merge_logs: true,
            watch: ['./src/server', './ecosystem.config.js'],
            interpreter: '/Users/henryehly/.nvm/versions/node/v6.9.4/bin/node',
            env: {
                NODE_ENV: 'development'
            }
        },
        {
            name: 'api.stg',
            script: `${currentDir}/src/server/index.js`,
            cwd: currentDir,
            error_file: `${logDir}/pm2/api.stg.err.log`,
            out_file: `${logDir}/pm2/api.stg.out.log`,
            pid_file: '/run/pm2/api.stg.pid',
            exec_mode: 'cluster',
            combine_logs: true,
            interpreter: '/usr/local/nodejs-binary/bin/node',
            env: {
                NODE_ENV: 'staging'
            }
        }
    ]
};
