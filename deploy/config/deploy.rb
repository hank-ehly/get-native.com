lock '3.6.1'

set :application, 'get-native.com'
set :repo_url, 'git@github.com:hank-ehly/get-native.com.git'
set :deploy_to, "/var/www/#{fetch(:application)}"
set :scm, :git
set :keep_releases, 5

after 'deploy:updated', :setup do
    on roles(:web) do
        %w(npm:install gulp:build pm2:reload).each do |t|
            invoke t
        end
    end
end
