#
# Cookbook Name:: provision
# Recipe:: mysql
#
# Copyright (c) 2016 Hank Ehly, All Rights Reserved.

execute 'sudo apt-get update'
include_recipe 'build-essential::default'

package 'psmisc'

mysql_service 'get-native' do
    version node['get-native']['mysql-version']
    initial_root_password 'root'
    bind_address '127.0.0.1'
    charset 'utf8'
    notifies :run, 'execute[sudo apt-get update]', :immediately
    action [:create, :start]
end
