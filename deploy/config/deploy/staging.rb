server '54.199.146.132',
       user: 'get-native',
       roles: %{web},
       ssh_options: {
           forward_agent: false,
           auth_methods: %w(publickey),
           keys: %w(~/.ssh/get-native.com/stg.web.get-native.com)
       }
