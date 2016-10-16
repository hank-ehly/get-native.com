#
# Cookbook Name:: provision
# Recipe:: web
#
# Copyright (c) 2016 Hank Ehly, All Rights Reserved.

include_recipe 'nodejs::nodejs_from_binary'
include_recipe 'nodejs::npm'

node[:nodejs][:global_npm_packages].each do |p|
    nodejs_npm p do
        user node[:user][:name]
    end
end
