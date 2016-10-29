lock '3.6.1'

require_relative './secret'

set :application, 'get-native.com'
set :repo_url, 'git@github.com:hank-ehly/get-native.com.git'
set :branch, 'master'
set :deploy_to, "/var/www/#{fetch(:application).to_s}/#{fetch(:stage)}"
set :scm, :git
