lock '3.6.1'

set :application, 'get-native.com'
set :repo_url, 'git@github.com:hank-ehly/get-native.com.git'
set :deploy_to, "/var/www/#{fetch(:application)}"
set :scm, :git
set :keep_releases, 5
set :linked_dirs, %w(src/server/config/secrets)

after 'deploy:updated', :setup do
    tasks = %w(npm:install gulp:build)

    if fetch(:stage).to_s == 'staging'
        tasks.push('sequelize:migrate:undo:all', 'sequelize:migrate', 'sequelize:seed:all')
    else
        tasks.push('sequelize:migrate')
    end

    tasks.push('mkdocs:build', 'pm2:reload')

    on roles(:web) do
        tasks.each { |t| invoke t }
    end
end
