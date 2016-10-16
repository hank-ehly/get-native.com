#
# Cookbook Name:: provision
# Recipe:: web
#
# Copyright (c) 2016 Hank Ehly, All Rights Reserved.

group node[:user][:primary_group]

user node[:user][:name] do
    group node[:user][:primary_group]
    home node[:user][:home]
    manage_home true
    password node[:user][:password]
end

include_recipe 'sudo::default'

sudo node[:user][:name] do
    template 'sudo-get_native.erb'
end

include_recipe 'locale::default'

include_recipe 'apache2::default'
include_recipe 'apache2::mod_ssl'
include_recipe 'apache2::mod_http2'

include_recipe 'nodejs::nodejs_from_binary'
include_recipe 'nodejs::npm'
