namespace :npm do
    desc 'Runs npm install'
    task :install do
        on roles(:web) do
            within release_path do
                execute :npm, 'install'
            end
        end
    end
end
