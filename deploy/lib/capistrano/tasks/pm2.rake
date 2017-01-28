SSHKit.config.command_map[:pm2] = '/usr/local/nodejs-binary/bin/pm2'

namespace :pm2 do
    desc 'Runs pm2 start command'
    task :reload do
        on roles(:web) do
            app_name_suffix = fetch(:stage) == 'production' ? 'prod' : 'stg'
            execute :pm2, 'startOrRestart', release_path.join('ecosystem.config.js'), '-i', 'max', '--only', "api.#{app_name_suffix}"
        end
    end
end
