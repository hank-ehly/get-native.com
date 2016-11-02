namespace :deploy do

    desc 'Run `npm install` in the project root directory'
    task :npm_install do
        on roles(:web) do |_|
            within "#{release_path}" do
                puts "Running 'npm install' from #{release_path}"
                execute :npm, 'install'
            end
        end
    end

end
