#
# Cookbook Name:: provision
# Recipe:: mysql
#
# Copyright (c) 2016 Hank Ehly, All Rights Reserved.

execute 'sudo apt-get update -y'
execute 'sudo apt-get -y upgrade'

include_recipe 'build-essential::default'

package 'psmisc'

mysql_service 'get-native' do
    version node['get-native']['mysql-version']
    initial_root_password 'root'
    bind_address '0.0.0.0'
    charset 'utf8'
    run_group 'mysql'
    run_user 'mysql'
    port 3306
    action [:create, :start]
end
