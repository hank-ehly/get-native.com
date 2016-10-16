#
# Cookbook Name:: provision
# Recipe:: web
#
# Copyright (c) 2016 Hank Ehly, All Rights Reserved.

execute 'sudo apt-get update'
include_recipe 'build-essential::default'

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
include_recipe 'apache2::mod_deflate'
include_recipe 'apache2::mod_rewrite'

include_recipe 'apache2::mod_http2'
package 'libnghttp2-dev'

extract_path = Chef::Config[:file_cache_path] + '/apache2'

bash 'mod_http2.so' do
    code <<-EOH
        sudo apt-get source apache2
        sudo mkdir -p #{extract_path} && cd #{extract_path}
        sudo apt-get source apache2
        sudo apt-get build-dep apache2
        cd apache-2.4.18
        sudo fakeroot debian/rules binary
        sudo cp debian/apache2-bin/usr/lib/apache2/modules/mod_http2.so
    EOH
    not_if { ::File.exists?('/usr/lib/apache2/modules/mod_http2.so') }
end

web_app 'get-native.com' do
    template 'get-native.com.conf.erb'
    server_name node['my_app']['hostname']
end

include_recipe 'nodejs::nodejs_from_binary'
include_recipe 'nodejs::npm'

package 'git'
