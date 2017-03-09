set :branch, 'master'

set :default_env, {
        NODE_ENV: 'production'
}

server '',
       ssh_options: {forward_agent: false},
       roles: %w{web}
