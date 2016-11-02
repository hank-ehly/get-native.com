lock '3.6.1'

set :application, 'get-native.com'
set :repo_url, 'git@github.com:hank-ehly/get-native.com.git'
set :deploy_to, "/var/www/#{fetch(:application).to_s}/#{fetch(:stage)}"
set :scm, :git
set :keep_releases, 3

after 'deploy:updated', 'deploy:npm_install'
after 'deploy:updated', 'deploy:build_prod_exp'
