SSHKit.config.command_map[:pm2] = '/usr/local/nodejs-binary/bin/pm2'

namespace :pm2 do
    desc 'Runs pm2 reload all'
    task :reload do
        on roles(:web) do
            if test('[[ -z $(pm2 list --mini-list) ]]')
                with(NODE_ENV: fetch(:stage)) do
                    execute :pm2, 'start', release_path.join('src/server/index.js'), '-i', 'max', '--name', 'api'
                end
            else
                execute :pm2, 'reload', 'api'
            end
        end
    end
end
