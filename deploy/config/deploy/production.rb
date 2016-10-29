set :keep_releases, 5
server fetch(:production_host), user: fetch(:production_user), ssh_options: {forward_agent: false}, roles: %w{web}
