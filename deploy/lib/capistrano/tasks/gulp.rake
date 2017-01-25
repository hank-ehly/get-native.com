namespace :gulp do
    desc 'Runs the gulp build task associated with the current stage'
    task :build do
        on roles(:web) do
            within release_path do
                env_config = fetch(:stage) == 'production' ? 'prod' : 'stg'
                execute :npm, 'run', 'gulp', 'build.prod.exp', '--', '--color', '--build-type', 'prod', '--env-config', env_config
            end
        end
    end
end
