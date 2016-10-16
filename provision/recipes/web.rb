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

package 'git'

include_recipe 'apache2::default'
include_recipe 'apache2::mod_ssl'
include_recipe 'apache2::mod_deflate'
include_recipe 'apache2::mod_rewrite'

include_recipe 'apache2::mod_http2'
package 'libnghttp2-dev'

extract_path = Chef::Config[:file_cache_path] + '/apache2'

bash 'mod_http2.so' do
    code <<-EOH
        sudo mkdir -p #{extract_path} && cd #{extract_path} && echo '[SUCCESS] cd extract_path'
        sudo apt-get source apache2 && echo '[SUCCESS] sudo apt-get source apache2'
        sudo apt-get build-dep -y apache2 && echo '[SUCCESS] sudo apt-get build-dep -y apache2'
        cd apache-2.4.18 && echo '[SUCCESS] cd apache-2.4.18'
        sudo fakeroot debian/rules binary && echo '[SUCCESS] sudo fakeroot debian/rules binary'
        sudo cp debian/apache2-bin/usr/lib/apache2/modules/mod_http2.so /usr/lib/apache2/modules/ && echo '[SUCCESS] sudo cp debian...'
        sudo chown root:root /usr/lib/apache2/modules/mod_http2.so && echo '[SUCCESS] sudo chown root:root ...'
    EOH
    not_if { ::File.exists?('/usr/lib/apache2/modules/mod_http2.so') }
end

web_app 'get-native.com' do
    template 'get-native.com.conf.erb'
    server_port '80' # TODO
    server_name 'get-native.com'
    server_aliases %w(www.get-native.com)
    docroot '/var/www/get-native.com/production/current/dist/prod'
end

include_recipe 'nodejs::nodejs_from_binary'
include_recipe 'nodejs::npm'
