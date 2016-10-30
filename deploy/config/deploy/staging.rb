server 'stg.get-native.com',
       user: 'get-native',
       roles: %{web},
       ssh_options: {
           forward_agent: false,
           auth_methods: %w(publickey)
       }
