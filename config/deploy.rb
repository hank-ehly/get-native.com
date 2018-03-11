lock '~> 3.10.1'

set :application, 'getnativelearning.com'
set :repo_url, 'git@github.com:hank-ehly/getnativelearning.com.git'
set :deploy_to, "/var/www/#{fetch(:application)}/#{fetch(:stage)}"

set :keep_releases, 5

set :default_env, {
        NODE_ENV: fetch(:stage)
}

server '139.162.114.38',
       user: 'getnative',
       roles: %w(web),
       ssh_options: {
               forward_agent: false,
               auth_methods: %w(publickey)
       }

def short_stage_name
    stages_map = {production: 'prod', staging: 'stg'}
    key = fetch(:stage).to_sym

    if stages_map.key?(key)
        stages_map[key]
    else
        raise CommandError.new('An error that should abort and rollback deployment')
    end
end

namespace :deploy do
    after :updated, :build do
        on roles(:web) do
            within release_path do
                execute :npm, '--production=false', 'install'

                execute :mkdir, 'dist' if test('[ ! -d dist ]')
                execute :npm, :run, :build, '--', fetch(:stage)

                execute :npm, :run, 'webpack', '--', '--config', 'webpack.server.config.js'
                execute :npm, :run, ['serve', 'ssr', short_stage_name].join(':')
            end

            %w(npm:install npm:build npm:webpack npm:ssr).each do |t|
                invoke t
            end
        end
    end
end
