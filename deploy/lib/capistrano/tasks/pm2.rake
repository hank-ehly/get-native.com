namespace :pm2 do
    desc 'Runs pm2 reload all'
    task :reload do
        on roles(:web) do
            if test('[[ -z $(pm2 list --mini-list) ]]')
                execute :pm2, 'start', release_path.join('src/server/index.js'), '-i', 'max', '--name', 'api'
            else
                execute :pm2, 'reload', 'api'
            end
        end
    end
end
