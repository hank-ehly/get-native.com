set :keep_releases, 3
server fetch(:staging_host), user: fetch(:staging_user), ssh_options: {forward_agent: false}, roles: %{web}
