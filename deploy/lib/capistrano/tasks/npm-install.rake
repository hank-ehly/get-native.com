namespace :deploy do

    desc 'Run `npm install` in the project root directory'
    task :npm_install do
        on roles(:web) do |_|
            within "#{current_path}" do
                execute :npm, 'install'
            end
        end
    end

end
