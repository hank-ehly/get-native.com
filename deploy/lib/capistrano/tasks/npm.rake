namespace :deploy do
    namespace :npm do
        desc 'Runs npm install'
        task :install do
            on roles(:web) do
                within release_path do
                    execute :npm, 'install'
                end
            end
        end

        desc 'Runs npm build script'
        task :build do
            on roles(:web) do
                within release_path do
                    env_config = fetch(:stage) == 'production' ? 'prod' : 'stg'
                    execute :npm, 'run', 'build.aot', '--', '--env-config', env_config
                end
            end
        end
    end
end
