#
# Cookbook Name:: provision
# Recipe:: mysql
#
# Copyright (c) 2016 Hank Ehly, All Rights Reserved.

execute 'sudo apt-get update' do
    action :nothing
end

mysql_service 'get-native' do
    version '5.7'
    initial_root_password 'root'
    charset 'utf8'
    notifies :run, 'execute[sudo apt-get update]', :immediately
    action [:create, :start]
end
