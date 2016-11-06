namespace :deploy do

    desc 'Run `npm run build.prod.exp` in the project root directory'
    task :build_prod_exp do
        on roles(:web) do |_|
            within "#{release_path}" do
                puts "Running 'npm run build.prod.exp -- --scss' from #{release_path}"
                execute :npm, 'run', 'build.prod.exp', '--', '--scss'
            end
        end
    end

end
