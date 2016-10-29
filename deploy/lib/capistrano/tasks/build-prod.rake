namespace :deploy do

    desc 'Run `npm run build.prod` in the project root directory'
    task :build_prod do
        on roles(:web) do |_|
            within "#{current_path}" do
                execute :npm, 'run', 'build.prod'
            end
        end
    end

end
