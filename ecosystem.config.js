module.exports = {
    apps: [
        {
            name: 'api.dev',
            script: './src/server',
            error_file: './api.dev.err.log',
            out_file: './api.dev.out.log',
            pid_file: './api.dev.pid',
            exec_mode: 'fork',
            merge_logs: true,
            watch: ['src/server', 'ecosystem.config.js'],
            interpreter: '/Users/henryehly/.nvm/versions/node/v6.9.4/bin/node',
            env: {
                NODE_ENV: 'development'
            }
        },
        {
            name: 'api.stg.get-native.com',
            script: '/var/www/get-native.com/current/src/server/index.js',
            cwd: '/var/www/get-native.com/current',
            error_file: '/var/log/pm2/api.stg.get-native.com.err.log',
            out_file: '/var/log/pm2/api.stg.get-native.com.out.log',
            pid_file: '/run/pm2/api.stg.get-native.com.pid',
            exec_mode: 'fork',
            combine_logs: true,
            interpreter: '/usr/local/nodejs-binary/bin/node',
            env: {
                NODE_ENV: 'staging'
            }
        }
    ]
};
