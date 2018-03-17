lock '~> 3.10.1'

set :application, 'getnative.org'
set :repo_url, 'git@github.com:hank-ehly/getnative.org.git'
set :deploy_to, "/var/www/#{fetch(:application)}/#{fetch(:stage)}"

set :keep_releases, 5

set :default_env, {
        NODE_ENV: fetch(:stage).to_s
}

server '139.162.114.38',
       user: 'getnative',
       roles: %w(web),
       ssh_options: {
               forward_agent: false,
               auth_methods: %w(publickey)
       }

namespace :deploy do
    after :updated, :build do
        on roles(:web) do
            within release_path do
                execute :npm, '--production=false', 'install'

                execute :mkdir, 'dist' if test('[ ! -d dist ]')
                execute :npm, :run, :build, '--', fetch(:stage).to_s

                execute :npm, :run, 'webpack', '--', '--config', 'webpack.server.config.js'
                execute :npm, :run, ['serve', 'ssr', fetch(:stage).to_s].join(':')
            end
        end
    end
end
