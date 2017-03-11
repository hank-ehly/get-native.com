set :branch, :develop

set :default_env, {
        NODE_ENV: 'staging'
}

server 'stg.get-native.com',
       user: 'get-native',
       roles: %w(web),
       ssh_options: {
               forward_agent: false,
               auth_methods: %w(publickey),
               keys: %w(~/.ssh/stg.get-native.com/deploy.web)
       }
