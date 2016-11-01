namespace :deploy do

    desc 'Run `npm run build.prod.exp` in the project root directory'
    task :build_prod_exp do
        on roles(:web) do |_|
            within "#{current_path}" do
                execute :npm, 'run', 'build.prod.exp'
            end
        end
    end

end
