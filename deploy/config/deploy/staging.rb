server fetch(:staging_host),
       ssh_options: {forward_agent: false},
       roles: %{web}
