set :branch, :develop

set :default_env, {
        NODE_ENV: 'staging'
}

server '45.79.159.54',
       user: 'get-native',
       roles: %w(web),
       ssh_options: {
               forward_agent: false,
               auth_methods: %w(publickey)
       }
